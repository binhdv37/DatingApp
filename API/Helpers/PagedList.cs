using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
    public class PagedList<T> : List<T>
    {
        //how to understand this PageList<T> class :
        // 1 class chua thong tin 1 List cua object nao do
        // them 1 so thong tin : tong so luong object trong list, pageNumber, pageSize, totalPage
        // Khác với list thông thường ở các cái thuộc tính pageNumber, .. thêm vào
        // Bên controller có thể sd các thuộc tính này để adđ header dễ dàng.

        public PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        {
            CurrentPage = pageNumber;
            TotalPages = (int) Math.Ceiling(count / (double) pageSize);
            PageSize = pageSize;
            TotalCount = count;
            AddRange(items); //them items vao cuoi list nay.
        }

        public int  CurrentPage { get; set; }

        public int TotalPages { get; set; }

        public int PageSize { get; set; }

        public int TotalCount { get; set; }

        public static async Task<PagedList<T>>
            CreateAsync(IQueryable<T> source,
                int pageNumber, int pageSize)
        {
            var count = await source.CountAsync(); // truy cap db, count tong so luong
            // truy cập db, lấy ra các items dựa theo pageNumber và pageSize
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }

    }
}
