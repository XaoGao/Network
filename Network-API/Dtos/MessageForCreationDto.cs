using System;

namespace Network_API.Dtos
{
    public class MessageForCreationDto
    {
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public DateTime MassageSent { get; set; }
        public string Content { get; set; }
        public MessageForCreationDto()
        {
            MassageSent = DateTime.Now;
        }
    }
}