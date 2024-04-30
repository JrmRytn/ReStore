using System.Text.Json;
using API.RequestHelpers;

namespace API.Extensions;

public static class HttpExtensions
{
    public static void AddPaginationHeader(this HttpResponse response, MetaData metaData)
    {
        JsonSerializerOptions jsonSerializerOptions = new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        
        var options = jsonSerializerOptions;

        response.Headers.Append("Pagination", JsonSerializer.Serialize(metaData, options));
        response.Headers.Append("Access-Control-Expose-Headers", "Pagination"); 
    }
}