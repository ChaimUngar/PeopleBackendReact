using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleBackendReact.Data;
using PeopleBackendReact.Web.Models;

namespace PeopleBackendReact.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetAllPeople();
        }

        [HttpPost]
        [Route("add")]
        public void Add(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.AddPerson(person);
        }

        [HttpPost]
        [Route("update")]
        public void Update(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.UpdatePerson(person);
        }

        [HttpPost]
        [Route("deleteone")]
        public void DeleteOne(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeletePerson(person);
        }

        [HttpPost]
        [Route("deleteallchecked")]
        public void DeleteAllChecked(DeleteViewModel vm)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeleteAllChecked(vm.Ids);
        }
    }
}
