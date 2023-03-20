const { getComplexity, simpleEstimator, fieldExtensionsEstimator } = require("graphql-query-complexity");

module.exports = (schema, threshold) => ({
    requestDidStart: () => ({
        didResolveOperation({ request, document }) {
            const complexity = getComplexity({
                schema,
                // It's worth to consider to check if the document contains multiple operations
                // so complexity could be calculated for each of them
                variables: request.variables,
                estimators: [
                    fieldExtensionsEstimator(),
                    simpleEstimator({ defaultComplexity: 1 })
                ]
            });
            if (complexity > threshold) {
                // You should log it with IP
                throw new Error(`Query exceeded complexity limit ${complexity} `);
            }

            console.log("Complexity of called query:", complexity);
        }
    })
});