using System;
using System.Threading.Tasks;
using Network_API.Models;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Network_API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        /// <summary>
        /// Зарегистрировать нового пользователя
        /// </summary>
        /// <param name="user">Имя пользователя</param>
        /// <param name="password">Пароль пользователя</param>
        /// <returns></returns>
        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;

            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }
        /// <summary>
        /// Хэширует пароль используя ключ (Метод с побочный эффектом)
        /// </summary>
        /// <param name="password">Пароль пользователя</param>
        /// <param name="passwordHash">Перменная куда запишется ХЭШ пароль</param>
        /// <param name="passwordSalt">Ключ ХЭШирования</param>
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
        /// <summary>
        /// Проверять корректность пары Имя-Пароль
        /// </summary>
        /// <param name="username">Имя пользователя</param>
        /// <param name="password">Пароль пользователя</param>
        /// <returns>Null - пользователя не существет или не корректный пароль, иначе возвращает пользователя их БД</returns>
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }
        /// <summary>
        /// Проверяет пароль пользователя
        /// </summary>
        /// <param name="password">Пароль пользователя</param>
        /// <param name="passwordHash">Пароль пользователя в БД</param>
        /// <param name="passwordSalt">Ключь ХЭШирования из БД</param>
        /// <returns></returns>
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                    
                }
                return true;
            }
        }
        /// <summary>
        /// Проверить зарегистрировал ли пользователь в системе
        /// </summary>
        /// <param name="username">Имя пользователя</param>
        /// <returns>True - пользователь зарегистрирован в системе, False - пользователь не зарегистрирован</returns>
        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(u => u.Username == username))
                return true;

            return false;
        }
    }
}