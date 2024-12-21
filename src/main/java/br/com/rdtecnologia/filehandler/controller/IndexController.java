package br.com.rdtecnologia.filehandler.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class IndexController {

  @RequestMapping(value = {"/"}, method = {RequestMethod.GET, RequestMethod.POST})
  public ModelAndView index() { return renderModelAndView("index_deploy"); }

  @RequestMapping(value={"/login"}, method = {RequestMethod.GET, RequestMethod.POST})
  public ModelAndView login() { return renderModelAndView("login"); }

  @RequestMapping(value={"/error"}, method = {RequestMethod.GET, RequestMethod.POST})
  public ModelAndView error() { return renderModelAndView("index_deploy"); }

  private ModelAndView renderModelAndView(String viewName) {
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.setViewName(viewName);
    return modelAndView;
  }

}