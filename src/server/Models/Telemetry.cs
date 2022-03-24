namespace TestApi.Models
{
    using Microsoft.AspNetCore.Http;
    using OpenTelemetry.Context.Propagation;
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;

    public static class Telemetry
    {
        public static readonly ActivitySource MyActivitySource = new("TestApi");

        private static readonly Func<IDictionary<string, string>, string, IEnumerable<string>> Getter =
            (d, k) =>
            {
                d.TryGetValue(k, out var v);
                return new string[] { v };
            };

        /// <summary>
        /// Gets the PropagationContext using the headers from the current Request object.
        /// </summary>
        /// <returns>The current PropagationContext.</returns>
        public static PropagationContext GetPropagationContext(HttpRequest request)
        {
            B3Propagator b3PropagatorSingleHeader = new B3Propagator(true);

            Dictionary<string, string> requestHeaders = new();

            foreach (var header in request.Headers)
            {
                requestHeaders.Add(header.Key, header.Value);
            }

            var propagationContext = b3PropagatorSingleHeader.Extract(default, requestHeaders, Getter);

            return propagationContext;
        }
    }
}
