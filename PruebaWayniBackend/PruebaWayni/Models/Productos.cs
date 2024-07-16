using System.ComponentModel.DataAnnotations;

namespace PruebaWayni.Models
{
    public class Productos
    {
        [Required(ErrorMessage = "El campo Id es requerido.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo Nombre es requerido.")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El campo Precio es requerido.")]
        public decimal Precio { get; set; }
    }
}
