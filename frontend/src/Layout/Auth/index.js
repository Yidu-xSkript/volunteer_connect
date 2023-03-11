import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";

const AuthLayout = ({children}) => (
    <>
        <Header/>
        {children}
        <Footer/>
    </>
);
export default AuthLayout;