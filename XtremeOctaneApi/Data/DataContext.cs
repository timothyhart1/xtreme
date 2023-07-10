using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using XtremeOctaneApi.Models;

namespace XtremeOctaneApi.Data

{
    public class DataContext : IdentityDbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {

        }

        public DbSet<Event> Event { get; set; }
        public DbSet<Member> Member { get; set; }
        public DbSet<Vehicle> Vehicle { get; set; }
        public DbSet<MemberTrackTime> MemberTrackTime { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<EventVote> EventVote { get; set; }
        public DbSet<EventExpenses> EventExpenses { get; set; }

    }
}

