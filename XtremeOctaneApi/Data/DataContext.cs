using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using XtremeOctaneApi.Models;
using XtremeOctaneApi.Security.Models;

namespace XtremeOctaneApi.Data
{
    public class DataContext : IdentityDbContext<ApplicationUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<EventModel> Event { get; set; }
        public DbSet<MemberModel> Member { get; set; }
        public DbSet<VehicleModel> Vehicle { get; set; }
        public DbSet<MemberTrackTimeModel> MemberTrackTime { get; set; }
        public DbSet<EventVoteModel> EventVote { get; set; }
        public DbSet<EventExpenseModel> EventExpenses { get; set; }
        public DbSet<ApplicationUser> AspNetUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<EventExpenseModel>()
               .Property(e => e.ExpenseAmount)
               .HasColumnType("decimal(18,2)");
        }
    }
}
