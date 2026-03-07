# Agent Workflow

1. Site Auditor reviews the website and finds visual issues.

2. Designer converts the issue into a clear task.

3. The task is added to TASK_QUEUE.md under Pending Tasks.

4. Fixer reads TASK_QUEUE.md and executes the first pending task.

5. After implementing the change, the Fixer moves the task to Needs Verification.

6. Verifier reviews the result visually on localhost.

7. If the result is correct → move task to Completed Tasks.

8. If the result is incorrect → revert the change and return task to Pending Tasks.