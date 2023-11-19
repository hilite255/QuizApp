using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DbModels
{
    [PrimaryKey(nameof(Id))]
    public class DbUser
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

    }
}
