using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddCellColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0904e68e-24c1-44f0-a680-50ad0115162b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5c63a0e4-de35-48dc-970e-61f19e67ae90");

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
                    { "d50e2991-c318-4c04-a548-fbaa6f3a134a", null, "User", "USER" },
                    { "f6ee340b-b4e7-44ba-877d-8d4c93ff7925", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d50e2991-c318-4c04-a548-fbaa6f3a134a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f6ee340b-b4e7-44ba-877d-8d4c93ff7925");

            migrationBuilder.DropColumn(
                name: "Test_Code",
                table: "T_Cell");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0904e68e-24c1-44f0-a680-50ad0115162b", null, "User", "USER" },
                    { "5c63a0e4-de35-48dc-970e-61f19e67ae90", null, "Admin", "ADMIN" }
                });
        }
    }
}
