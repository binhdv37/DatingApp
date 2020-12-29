import {PaginatedResult} from '../_models/pagination';
import {map} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';

export function getPaginatedResult<T>(url, params, http: HttpClient) {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
  // observe: 'response' : => hàm get bên dưới tra về full response thay vì chỉ body như thông thường.
  // dễ dàng truy cập body và header như bên dưới, map các giá trị như bên dưới.
  return http.get<T>(url, {observe: 'response', params}).pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') !== null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

export function getPaginationHeaders(pageNumber: number, pageSize: number){
  let params = new HttpParams();

  params = params.append('pageNumber', pageNumber.toString());
  params = params.append('pageSize', pageSize.toString());

  return params;
}
