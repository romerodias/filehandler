//package br.com.rdtecnologia.filehandler.application.config;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
//import org.springframework.stereotype.Component;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//import java.io.IOException;
//import java.security.Principal;
//
//@Component
//@Slf4j
//public class AuthenticationSuccessHandlerImpl extends SavedRequestAwareAuthenticationSuccessHandler {
//
//    @Autowired private HttpSession session;
////
////    @Autowired
////    private UsuarioService usuarioService;
//
//    @Override
//    public void onAuthenticationSuccess(
//            HttpServletRequest request, HttpServletResponse response,
//            Authentication authentication) throws IOException, ServletException {
//
//        log.info("Start custom AuthenticationSuccessHandler");
//
//        String userName = "";
//        if(authentication.getPrincipal() instanceof Principal) {
//            userName = ((Principal)authentication.getPrincipal()).getName();
//
//        }else {
//            userName = ((User)authentication.getPrincipal()).getUsername();
//        }
////        SystemContract systemContract = usuarioService.findByLogin(userName).getContract();
////        session.setAttribute("contractId", systemContract.getId());
//        log.info("User [{}] create session ",
//            userName);
//        super.onAuthenticationSuccess(request, response, authentication);
//
//    }
//
//}