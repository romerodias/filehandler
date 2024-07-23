package br.com.rdtecnologia.filehandler.controller.converter;

import org.springframework.data.domain.Page;

import java.util.List;

public class JsonReturnList<T> {
  private Integer totalCount;
  private List<T> data;

  public JsonReturnList() {}

  public JsonReturnList(Integer totalCount, List<T> rows) {
    super();
    this.totalCount = totalCount;
    this.data = rows;
  }

  public JsonReturnList(Page<T> page) {
    super();
    this.totalCount = page == null? 0 : (int) page.getTotalElements();
    this.data = page == null? null : page.getContent();
  }

  public JsonReturnList(List<T> page) {
    super();
    this.totalCount = page.size();
    this.data = page;
  }

  public Integer getTotalCount() {
    return totalCount;
  }
  public void setTotalCount(Integer totalCount) {
    this.totalCount = totalCount;
  }
  public List<T> getData() {
    return data;
  }
  public void setData(List<T> data) {
    this.data = data;
  }
}