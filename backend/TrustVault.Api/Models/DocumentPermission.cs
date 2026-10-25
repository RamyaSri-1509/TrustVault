
namespace TrustVault.Api.Models;

public class DocumentPermission
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid DocumentId { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string AccessLevel { get; set; } = "Viewer";
    public DateTime GrantedAt { get; set; } = DateTime.UtcNow;
}
