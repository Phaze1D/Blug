from flask import jsonify

class FormException(Exception):
    """ Exception Class created when a form has invalid data with
        status 422 (Unprocessable Entity)
    """
    status_code = 422

    def __init__(self, message, status_code=None, payload=None):
        """
        Args:
            message: The error message to send back.
            status_code: A status code if default does not suffic
            payload: Extra info in the form of a dict.
        """

        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        """
        Returns:
            dictionary of the Exception information
        """

        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv
