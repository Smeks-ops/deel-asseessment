const getProfile = async (req, res, next) => {
  const profileId = req.get('profile_id');

  // Validate profile_id is present and is a positive integer
  if (
    !profileId ||
    !Number.isInteger(parseInt(profileId)) ||
    parseInt(profileId) < 1
  ) {
    return res
      .status(400)
      .send('Profile ID is invalid or missing in the request headers.');
  }

  try {
    const { Profile } = req.app.get('models');
    const profile = await Profile.findOne({ where: { id: profileId } });

    if (!profile) {
      return res.status(401).send('Profile not found or access unauthorized.');
    }

    req.profile = profile;
    next();
  } catch (error) {
    res.status(500).send('Server error while retrieving profile.');
  }
};

module.exports = { getProfile };
