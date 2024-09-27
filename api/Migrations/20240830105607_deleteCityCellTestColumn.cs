using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class deleteCityCellTestColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Test_Code",
                table: "T_Cell");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1f2146c4-9cee-430a-b358-f2d6fa6a164f", null, "Admin", "ADMIN" },
                    { "9d4d1ce8-4782-4d63-bfca-df1447dd0d90", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1f2146c4-9cee-430a-b358-f2d6fa6a164f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9d4d1ce8-4782-4d63-bfca-df1447dd0d90");

            migrationBuilder.AddColumn<string>(
                name: "Test_CityCode",
                table: "T_City",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Test_Code",
                table: "T_Cell",
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
    }
}
