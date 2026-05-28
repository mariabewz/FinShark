using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {

        }

        public DbSet<Stock> Stocks { get; set; }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Portfolio>(x => x.HasKey(p => new { p.AppUserId, p.StockId }));

            builder.Entity<Portfolio>()
                .HasOne(u => u.AppUser)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.AppUserId);

            builder.Entity<Portfolio>()
                .HasOne(u => u.Stock)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.StockId);


            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = "f9f9b4f2-138f-48a5-9c8c-4c284346ad88",
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    ConcurrencyStamp = "780c2c85-7f07-4059-ba0a-a0ac3c296c3c"
                },
                new IdentityRole
                {
                    Id = "c18845bc-6f63-4031-b291-99f37dbb5bad",
                    Name = "User",
                    NormalizedName = "USER",
                    ConcurrencyStamp = "f1b34b4b-a223-44b9-bcbe-0ab4c003479a"
                },
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
