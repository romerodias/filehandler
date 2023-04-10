package br.com.rdtecnologia.filehandler.controller.converter;

import org.springframework.data.domain.Page;

import java.util.List;

public class JsonReturnList<T> {
  private Integer totalCount;
  private List<T> rows;

  public JsonReturnList() {}

  public JsonReturnList(Integer totalCount, List<T> rows) {
    super();
    this.totalCount = totalCount;
    this.rows = rows;
  }

  public JsonReturnList(Page<T> page) {
    super();
    this.totalCount = (int)page.getTotalElements();
    this.rows = page.getContent();
  }

  public JsonReturnList(List<T> page) {
    super();
    this.totalCount = page.size();
    this.rows = page;
  }

  public Integer getTotalCount() {
    return totalCount;
  }

  public void setTotalCount(Integer totalCount) {
    this.totalCount = totalCount;
  }

  public List<T> getRows() {
    return rows;
  }

  public void setRows(List<T> rows) {
    this.rows = rows;
  }

}
