﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using XtremeOctaneApi.Data;

#nullable disable

namespace XtremeOctaneApi.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240321130402_InitialMain")]
    partial class InitialMain
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Value")
                        .HasColumnType("longtext");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("XtremeOctaneApi.Models.EventExpenseEditLog", b =>
                {
                    b.Property<int>("LogId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("EditedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("EventExpenseId")
                        .HasColumnType("int");

                    b.Property<int>("MemberId")
                        .HasColumnType("int");

                    b.Property<string>("NewExpenseName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("NewValue")
                        .HasColumnType("longtext");

                    b.Property<string>("PreviousExpenseName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PreviousValue")
                        .HasColumnType("longtext");

                    b.HasKey("LogId");

                    b.ToTable("EventExpenseEditLog");
                });

            modelBuilder.Entity("XtremeOctaneApi.Models.EventExpenseModel", b =>
                {
                    b.Property<int>("EventExpenseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool?>("Active")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("AddedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Category")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("EventId")
                        .HasColumnType("int");

                    b.Property<decimal>("ExpenseAmount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("ExpenseName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int?>("MemberId")
                        .HasColumnType("int");

                    b.HasKey("EventExpenseId");

                    b.ToTable("EventExpenses");
                });

            modelBuilder.Entity("XtremeOctaneApi.Models.EventModel", b =>
                {
                    b.Property<int>("EventId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool?>("Deleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("EventDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("EventDesc")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("EventImage")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("EventName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("EventId");

                    b.ToTable("Event");
                });

            modelBuilder.Entity("XtremeOctaneApi.Models.EventVoteModel", b =>
                {
                    b.Property<int>("EventVoteId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("EventId")
                        .HasColumnType("int");

                    b.Property<int>("MemberId")
                        .HasColumnType("int");

                    b.Property<string>("Vote")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("VoteDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("EventVoteId");

                    b.ToTable("EventVote");
                });

            modelBuilder.Entity("XtremeOctaneApi.Models.ExpenseCategory", b =>
                {
                    b.Property<int>("ExpenseCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("ExpenseCategoryId");

                    b.ToTable("ExpenseCategory");
                });

            modelBuilder.Entity("XtremeOctaneApi.Models.MemberModel", b =>
                {
                    b.Property<int>("MemberId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime(6)");

                    b.Property<bool?>("Deleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<string>("Gender")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<string>("ProfilePicture")
                        .HasColumnType("longtext");

                    b.Property<string>("Surname")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<bool?>("Verified")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("MemberId");

                    b.HasIndex("UserId");

                    b.ToTable("Member");
                });

            modelBuilder.Entity("XtremeOctaneApi.Models.MemberTrackTimeModel", b =>
                {
                    b.Property<int>("MemberTrackTimeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Conditions")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int?>("LapTimeMiliseconds")
                        .HasColumnType("int");

                    b.Property<int>("LapTimeMinutes")
                        .HasColumnType("int");

                    b.Property<string>("LapTimeScreenshot")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("LapTimeSeconds")
                        .HasColumnType("int");

                    b.Property<int>("MemberId")
                        .HasColumnType("int");

                    b.Property<DateTime>("TrackDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Tyre")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("VehicleClass")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("VehicleId")
                        .HasColumnType("int");

                    b.Property<bool?>("Verified")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("MemberTrackTimeId");

                    b.HasIndex("VehicleId");

                    b.ToTable("MemberTrackTime");
                });

            modelBuilder.Entity("XtremeOctaneApi.Models.VehicleModel", b =>
                {
                    b.Property<int>("VehicleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool?>("HasImage")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Manufacturer")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("MemberId")
                        .HasColumnType("int");

                    b.Property<int>("Mileage")
                        .HasColumnType("int");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Plate")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("VehicleImage")
                        .HasColumnType("longtext");

                    b.Property<string>("Year")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("VehicleId");

                    b.HasIndex("MemberId");

                    b.ToTable("Vehicle");
                });

            modelBuilder.Entity("XtremeOctaneApi.Security.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("XtremeOctaneApi.Security.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("XtremeOctaneApi.Security.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("XtremeOctaneApi.Security.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("XtremeOctaneApi.Security.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("XtremeOctaneApi.Models.MemberModel", b =>
                {
                    b.HasOne("XtremeOctaneApi.Security.Models.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("XtremeOctaneApi.Models.MemberTrackTimeModel", b =>
                {
                    b.HasOne("XtremeOctaneApi.Models.VehicleModel", "Vehicle")
                        .WithMany()
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("XtremeOctaneApi.Models.VehicleModel", b =>
                {
                    b.HasOne("XtremeOctaneApi.Models.MemberModel", "Member")
                        .WithMany()
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Member");
                });
#pragma warning restore 612, 618
        }
    }
}
