namespace XtremeOctaneApi.Models
{
    public class AddVehicleModel
    {
        public int VehicleId { get; set; }
        public int MemberId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string Year { get; set; }
        public int Mileage { get; set; }
        public string Plate { get; set; }
        public string Color { get; set; }
        public IFormFile VehicleImage { get; set; }

    }
}
