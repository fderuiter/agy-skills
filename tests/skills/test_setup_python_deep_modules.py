"""
Automated validation test for setup-python-deep-modules skill.
"""

import os
import unittest

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SKILL_PATH = os.path.join(REPO_ROOT, "skills", "engineering", "setup-python-deep-modules", "SKILL.md")
DOC_PATH = os.path.join(REPO_ROOT, "docs", "engineering", "setup-python-deep-modules.md")


class TestSetupPythonDeepModulesSkill(unittest.TestCase):
    def test_skill_file_exists(self):
        """Verify that SKILL.md exists."""
        self.assertTrue(os.path.exists(SKILL_PATH), f"Skill file missing at {SKILL_PATH}")

    def test_doc_file_exists(self):
        """Verify that docs page exists."""
        self.assertTrue(os.path.exists(DOC_PATH), f"Docs page missing at {DOC_PATH}")

    def test_no_em_dashes_in_skill_and_docs(self):
        """Verify that prose contains zero em-dashes."""
        for file_path in [SKILL_PATH, DOC_PATH]:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            self.assertNotIn("—", content, f"{file_path} must not contain em-dashes.")
            self.assertNotIn("\u2014", content, f"{file_path} must not contain unicode em-dashes.")


if __name__ == "__main__":
    unittest.main()
