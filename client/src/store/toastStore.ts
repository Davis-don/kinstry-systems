import { create } from "zustand";

type ToastType = "success" | "info" | "warning" | "error";

interface ToastState {
  status: boolean;        // true = visible, false = hidden
  message: string;        // toast message
  type: ToastType;        // type of toast for styling
  time: number;           // duration in seconds
  title: string;          // optional title for the toast
  icon?: string;          // custom icon
  position: 'center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'; // position
  showProgress: boolean;  // whether to show progress bar
  showToast: (message: string, type?: ToastType, time?: number, title?: string, position?: string) => void; // show the toast
  hideToast: () => void;  // hide the toast
  setToastConfig: (config: {
    position?: 'center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    showProgress?: boolean;
    defaultTitle?: string;
  }) => void;
}

const useToastStore = create<ToastState>((set) => ({
  status: false,
  message: "Welcome to Smart Web Tech",
  type: "info", // default type
  time: 8,      // default duration in seconds
  title: "Notification",
  position: 'center',
  showProgress: true,

  // Set toast configuration
  setToastConfig: (config) => {
    set((state) => ({
      position: config.position || state.position,
      showProgress: config.showProgress !== undefined ? config.showProgress : state.showProgress,
      title: config.defaultTitle || state.title,
    }));
  },

  // Show toast with optional type, duration, title, and position
  showToast: (message, type: ToastType = "info", time = 3, title?: string, position?: string) => {
    const toastTitle = title || (type === "success" ? "Success!" : 
                                type === "error" ? "Error!" : 
                                type === "warning" ? "Warning!" : "Info");
    
    set({ 
      status: true, 
      message, 
      type, 
      time,
      title: toastTitle,
      position: (position as any) || 'center'
    });

    // Auto-hide after duration
    setTimeout(() => {
      set({ status: false, message: "", type: "info", time: 3, title: "Notification" });
    }, time * 1000);
  },

  // Manually hide toast
  hideToast: () => set({ 
    status: false, 
    message: "", 
    type: "info", 
    time: 3, 
    title: "Notification" 
  }),
}));

// Export helper functions for easy usage
export const toast = {
  success: (message: string, time?: number, title?: string) => 
    useToastStore.getState().showToast(message, "success", time || 3, title),
  
  info: (message: string, time?: number, title?: string) => 
    useToastStore.getState().showToast(message, "info", time || 3, title),
  
  warning: (message: string, time?: number, title?: string) => 
    useToastStore.getState().showToast(message, "warning", time || 3, title),
  
  error: (message: string, time?: number, title?: string) => 
    useToastStore.getState().showToast(message, "error", time || 3, title),
};

export default useToastStore;