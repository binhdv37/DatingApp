﻿using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>() // map tu AppUser sang MemberDto
                // dest la PhotoUrl, src map la tu Photos.FirstOrDefault ...
                .ForMember(dest => dest.PhotoUrl,
                    opt
                        => opt.MapFrom(src =>
                            src.Photos.FirstOrDefault(x => x.IsMain).Url)) //map tu appuser => memberdto
                .ForMember(dest =>
                    dest.Age, opt
                    => opt.MapFrom(src
                    => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
        }
    }
}
