﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace XtremeOctaneApi.Models
{
    [Table("Event")]
    public class EventModel
    {
        [Key]
        public int EventId { get; set; }
        public string EventName { get; set; }
        public string StartDestination { get; set; }
        public string EndingDestination { get; set; }
        public string EventDesc { get; set; }
        public DateTime EventDate { get; set; }
        public string EventImage { get; set; }
        public Boolean? Deleted { get; set; }
    }
};