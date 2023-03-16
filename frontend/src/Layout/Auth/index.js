import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";

const AuthLayout = ({children, removeFooter = false}) => (
    <>
        <Header/>
        {children}
        {!removeFooter && <Footer/>}
    </>
);
export default AuthLayout;