import Toast from "../../../components/toast/Toast";
import './toastlayout.css'
import useToastStore from "../../../store/toastStore";

function Toasterlayout({ children }: { children: React.ReactNode }) {
  const { status } = useToastStore(); // get toast visibility from store

  return (
    <div className="overall-toast-layout">
      {/* Always show children */}
      <div className={`main-layout-component ${status ? 'blurred' : ''}`}>
        {children}
      </div>

      {/* Toast will render itself when status=true */}
      <Toast />
    </div>
  );
}

export default Toasterlayout;