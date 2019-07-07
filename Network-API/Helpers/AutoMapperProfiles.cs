using System;
using System.Linq;
using AutoMapper;
using Network_API.Dtos;
using Network_API.Models;

namespace Network_API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain == true).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.MapFrom(src => new DateTime(DateTime.Now.Subtract(src.DateOfBirth).Ticks).Year);
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain == true).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.MapFrom(src => new DateTime(DateTime.Now.Subtract(src.DateOfBirth).Ticks).Year);
                });
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
        }
    }
}