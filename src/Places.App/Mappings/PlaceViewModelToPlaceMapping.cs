using AutoMapper;
using Persistence.Models;
using PlacesSearchApp.Models;

namespace Places.App.Mappings
{
    public class PlaceViewModelToPlaceMapping : Profile
    {
        public PlaceViewModelToPlaceMapping() {

            CreateMap<PlaceViewModel, Place>(MemberList.Destination)
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
                .ForMember(dest => dest.Coordinates, opt => opt.MapFrom(src => src.Coordinates))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image))
                .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
                .ReverseMap();
        }
    }
}
