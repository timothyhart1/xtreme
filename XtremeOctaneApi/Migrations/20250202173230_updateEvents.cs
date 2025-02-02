using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace XtremeOctaneApi.Migrations
{
    /// <inheritdoc />
    public partial class updateEvents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EndingDestination",
                table: "Event",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "StartDestination",
                table: "Event",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndingDestination",
                table: "Event");

            migrationBuilder.DropColumn(
                name: "StartDestination",
                table: "Event");
        }
    }
}
