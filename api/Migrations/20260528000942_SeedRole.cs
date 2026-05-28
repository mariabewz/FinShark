using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class SeedRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c18845bc-6f63-4031-b291-99f37dbb5bad", "f1b34b4b-a223-44b9-bcbe-0ab4c003479a", "User", "USER" },
                    { "f9f9b4f2-138f-48a5-9c8c-4c284346ad88", "780c2c85-7f07-4059-ba0a-a0ac3c296c3c", "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c18845bc-6f63-4031-b291-99f37dbb5bad");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f9f9b4f2-138f-48a5-9c8c-4c284346ad88");
        }
    }
}
