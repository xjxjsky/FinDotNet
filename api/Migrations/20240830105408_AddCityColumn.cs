using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddCityColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d50e2991-c318-4c04-a548-fbaa6f3a134a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f6ee340b-b4e7-44ba-877d-8d4c93ff7925");

            migrationBuilder.AddColumn<string>(
                name: "Test_CityCode",
                table: "T_City",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "08cc8dd2-54f7-444b-ab0f-7b40704f1d0c", null, "User", "USER" },
                    { "1a83c98c-1655-4316-b81b-b5681c5bd550", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "08cc8dd2-54f7-444b-ab0f-7b40704f1d0c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1a83c98c-1655-4316-b81b-b5681c5bd550");

            migrationBuilder.DropColumn(
                name: "Test_CityCode",
                table: "T_City");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "d50e2991-c318-4c04-a548-fbaa6f3a134a", null, "User", "USER" },
                    { "f6ee340b-b4e7-44ba-877d-8d4c93ff7925", null, "Admin", "ADMIN" }
                });
        }
    }
}
