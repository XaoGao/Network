using System.Threading.Tasks;
using Network_API.Models;

namespace Network_API.Data
{
    public interface IAuthRepository
    {
        /// <summary>
        /// Зарегистрировать нового пользователя в системе
        /// </summary>
        /// <param name="user">Имя пользователя</param>
        /// <param name="password">Пароль пользователя</param>
        /// <returns>Возвращает зарегистриованного пользователя</returns>
         Task<User> Register(User user, string password);
         /// <summary>
         /// Проверить на наличие в системе указанного пользователя
         /// </summary>
         /// <param name="username">Имя прользователя - идентификатор</param>
         /// <param name="password">Пароль пользователя</param>
         /// <returns>Находит в БД пользователя и возвращает его</returns>
         Task<User> Login(string username, string password);
         /// <summary>
         /// Проверяет на наличие пользователя в системе
         /// </summary>
         /// <param name="username">Имя прользователя - идентификатор</param>
         /// <returns>True - если пользователь зарегистрирован в системе, False - если пользователь не зарегистриоован</returns>
         Task<bool> UserExists(string username);
    }
}