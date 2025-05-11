import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class CustomReporter implements Reporter {
    onBegin(config: any, suite: any) {
        console.log(`Starting the run with ${suite.allTests().length} tests`);
    }

    onTestBegin(test: TestCase) {
        console.log(`Starting test ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        console.log(`Finished test ${test.title}: ${result.status}`);
        if (result.status === 'failed') {
            console.log(`Error: ${result.error?.message}`);
            if (result.error?.stack) {
                console.log(`Stack trace: ${result.error.stack}`);
            }
        }
    }

    onEnd(result: any) {
        console.log(`Finished the run: ${result.status}`);
        console.log(`Total tests: ${result.totalTests}`);
        console.log(`Passed: ${result.passed}`);
        console.log(`Failed: ${result.failed}`);
        console.log(`Skipped: ${result.skipped}`);
    }
}

export default CustomReporter; 