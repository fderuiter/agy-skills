"""
Automated SDK Benchmarks and Multi-Agent Evaluation Suite for agy-skills.
Tests structured envelope protocols, lifecycle hook safety, and multi-agent coordination.
"""

import json
import os
import subprocess
import sys
import unittest

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOOKS_DIR = os.path.join(REPO_ROOT, ".agents", "hooks")

CANONICAL_MESSAGE_TYPES = {
    "task_assignment",
    "status_update",
    "checkpoint",
    "blocker",
    "review_finding",
    "task_completion",
}


class TestSdkBenchmarks(unittest.TestCase):
    def test_structured_envelope_schema(self):
        """Verify that structured message envelopes conform to the inter-agent protocol."""
        sample_envelope = {
            "type": "task_assignment",
            "taskId": "ticket-101",
            "status": "in_progress",
            "payload": {
                "specPath": "docs/specs/auth.md",
                "requirements": "Implement JWT token validation"
            },
            "nextAction": "Run TDD loop and notify upon completion."
        }

        self.assertIn(sample_envelope["type"], CANONICAL_MESSAGE_TYPES)
        self.assertIn("taskId", sample_envelope)
        self.assertIn("status", sample_envelope)
        self.assertIsInstance(sample_envelope["payload"], dict)

    def test_git_safety_hook_blocks_destructive_commands(self):
        """Verify that block-dangerous-git.js denies destructive git commands."""
        hook_script = os.path.join(HOOKS_DIR, "block-dangerous-git.js")
        self.assertTrue(os.path.exists(hook_script), f"Hook script missing at {hook_script}")

        dangerous_payload = {
            "toolCall": {
                "name": "run_command",
                "args": {
                    "CommandLine": "git push origin main --force"
                }
            }
        }

        proc = subprocess.run(
            ["node", hook_script],
            input=json.dumps(dangerous_payload),
            text=True,
            capture_output=True
        )

        self.assertEqual(proc.returncode, 0)
        result = json.loads(proc.stdout)
        self.assertEqual(result.get("decision"), "deny")
        self.assertIn("BLOCKED", result.get("reason", ""))

    def test_git_safety_hook_allows_safe_commands(self):
        """Verify that block-dangerous-git.js allows safe git status and diff commands."""
        hook_script = os.path.join(HOOKS_DIR, "block-dangerous-git.js")
        
        safe_payload = {
            "toolCall": {
                "name": "run_command",
                "args": {
                    "CommandLine": "git status --short"
                }
            }
        }

        proc = subprocess.run(
            ["node", hook_script],
            input=json.dumps(safe_payload),
            text=True,
            capture_output=True
        )

        self.assertEqual(proc.returncode, 0)
        result = json.loads(proc.stdout)
        self.assertEqual(result.get("decision"), "allow")

    def test_pre_invocation_hygiene_hook(self):
        """Verify that pre-invocation-hygiene.js executes cleanly on a healthy repository."""
        hook_script = os.path.join(HOOKS_DIR, "pre-invocation-hygiene.js")
        self.assertTrue(os.path.exists(hook_script))

        proc = subprocess.run(
            ["node", hook_script],
            input=json.dumps({}),
            text=True,
            capture_output=True,
            cwd=REPO_ROOT
        )

        self.assertEqual(proc.returncode, 0)
        result = json.loads(proc.stdout)
        self.assertIsInstance(result, dict)

    def test_post_tool_formatter_hook(self):
        """Verify that post-tool-formatter.js validates touched files."""
        hook_script = os.path.join(HOOKS_DIR, "post-tool-formatter.js")
        self.assertTrue(os.path.exists(hook_script))

        payload = {
            "toolCall": {
                "name": "write_to_file",
                "args": {
                    "TargetFile": os.path.join(REPO_ROOT, "CONTEXT.md")
                }
            }
        }

        proc = subprocess.run(
            ["node", hook_script],
            input=json.dumps(payload),
            text=True,
            capture_output=True,
            cwd=REPO_ROOT
        )

        self.assertEqual(proc.returncode, 0)
        result = json.loads(proc.stdout)
        self.assertIsInstance(result, dict)


if __name__ == "__main__":
    unittest.main()

