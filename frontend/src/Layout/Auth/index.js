import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";
import AuthMiddleware from "../../utils/AuthMiddleware";


function AuthLayout({ children, removeFooter = false }) {
    const { isLoggedIn } = AuthMiddleware()

    return (
        <>
            {isLoggedIn && <Header />}
            {isLoggedIn && children}
            {!removeFooter && isLoggedIn && <Footer />}
        </>
    );
}
export default AuthLayout;