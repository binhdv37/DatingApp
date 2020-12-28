using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified; // hình như là báo cái user đã bị thay đổi
            // muốn update, gọi hàm này, sau đó gọi hàm SaveAllChange bên dưới để update vào db
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos) //eager loading Photo
                .ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            // // thêm các điều kiện vào dưới đây.
            // var query = _context.Users
            //     .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            //     .AsNoTracking(); // vi ta dang truy van data, nen k can entity tracking thay doi j ca
            //     // .AsQueryable();

                // return await PagedList<MemberDto>.CreateAsync(query,
                // userParams.PageNumber, userParams.PageSize);

                var query = _context.Users.AsQueryable();
                query = query.Where(u => u.UserName != userParams.CurrentUsername); // lay cac user khac user hien tai
                query = query.Where(u => u.Gender == userParams.Gender); // lay cac user co gender theo param

                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

                // tuong duong switch(userParams.OrderBy) ..., clean hon, k can su dung break
                query = userParams.OrderBy switch
                {
                    "created" => query.OrderByDescending(u => u.Created),
                    _ => query.OrderByDescending(u => u.LastActive) // _ la truong hop default
                };

                return await PagedList<MemberDto>.CreateAsync(query.ProjectTo<MemberDto>(_mapper
                        .ConfigurationProvider).AsNoTracking(),
                    userParams.PageNumber, userParams.PageSize);
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }
    }
}
