// API Base URL - uses environment variable or defaults to relative path for local development
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || '';

// URL logs removed for prod safety

// ==================== Get Requests ====================

export const getLeaders = async () => {
  const url = `${API_BASE_URL}/api/leaders`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching leaders:', error);
    throw error;
  }
};

export const getAboutUs = async () => {
  const url = `${API_BASE_URL}/api/aboutus`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching about us:', error);
    throw error;
  }
};

export const getMentors = async () => {
  const url = `${API_BASE_URL}/api/mentors`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching mentors:', error);
    throw error;
  }
};

export const getGallery = async (category?: string) => {
  const url = category 
    ? `${API_BASE_URL}/api/gallery?category=${category}`
    : `${API_BASE_URL}/api/gallery`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching gallery:', error);
    throw error;
  }
};

// ==================== Post Requests ====================

export const submitContact = async (contactData: any) => {
  const url = `${API_BASE_URL}/api/contact`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      const error: any = new Error(data.message || 'Failed to submit contact form');
      error.response = { data };
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error submitting contact:', error);
    throw error;
  }
};

export const submitClubMember = async (memberData: any) => {
  const url = `${API_BASE_URL}/api/club-members`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 28000);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      const error: any = new Error(data.message || 'Club membership registration failed. Please try again.');
      error.response = { data };
      throw error;
    }

    return data;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.warn('Backend server took longer than expected to respond (Render cold-start).');
      throw new Error('Server is taking time to wake up. Please click submit once more.');
    }
    console.error('Error submitting club member:', error);
    throw error;
  }
};

export const submitEnquiry = async (enquiryData: any) => {
  const url = `${API_BASE_URL}/api/enquiry`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enquiryData),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      // If server rejected due to unknown fields on older backend version, retry with standard fields and embedded metadata
      if (response.status === 400 && data.message === 'Validation Error') {
        const metadataString = `[Residence: ${enquiryData.residenceType || 'Day Scholar'}] [Designation: ${enquiryData.designation || 'Pending'}] [RoleAssignee: ${enquiryData.roleAssignee || 'Pending'}] [Photo: ${enquiryData.photo ? 'Uploaded' : 'None'}] ${enquiryData.otherInterest || ''}`.trim();
        const fallbackPayload = {
          name: enquiryData.name,
          regNumber: enquiryData.regNumber,
          contact: enquiryData.contact,
          email: enquiryData.email,
          department: enquiryData.department,
          batch: enquiryData.batch,
          interests: enquiryData.interests,
          otherInterest: metadataString,
        };
        const retryResponse = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fallbackPayload),
        });
        if (retryResponse.ok) {
          return await retryResponse.json();
        }
      }

      const error: any = new Error(data.message || 'Enquiry submission failed. Please try again.');
      error.response = { data };
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    throw error;
  }
};

export const registerTeam = async (submissionData: any) => {
  const url = `${API_BASE_URL}/api/register`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      const error: any = new Error(data.message || 'Registration failed. Please try again.');
      error.response = { data };
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error registering team:', error);
    throw error;
  }
};

export const registerCodeCrafterTeam = async (submissionData: FormData | any) => {
  const isFormData = submissionData instanceof FormData;
  const headers = isFormData ? {} : { 'Content-Type': 'application/json' };
  const url = `${API_BASE_URL}/api/codecrafter-register`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: isFormData ? submissionData : JSON.stringify(submissionData),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      const error: any = new Error(data.message || 'Registration failed. Please try again.');
      error.response = { data };
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error registering CodeCrafter team:', error);
    throw error;
  }
};

export const registerRoboMechTeam = async (submissionData: FormData | any) => {
  const isFormData = submissionData instanceof FormData;
  const headers = isFormData ? {} : { 'Content-Type': 'application/json' };
  const url = `${API_BASE_URL}/api/robomech-register`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: isFormData ? submissionData : JSON.stringify(submissionData),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      const error: any = new Error(data.message || 'Registration failed. Please try again.');
      error.response = { data };
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error registering RoboMech team:', error);
    throw error;
  }
};

export const registerEngineersDayParticipant = async (submissionData: any) => {
  const url = `${API_BASE_URL}/api/engineers-day/register`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      const error: any = new Error(data.message || 'Registration failed. Please try again.');
      error.response = { data };
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error registering for Engineers Day event:', error);
    throw error;
  }
};

// ==================== Admin Portal APIs ====================

export const getScreeningMembers = async () => {
  const url = `${API_BASE_URL}/api/screening-members`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Fallback to /api/club-members/screening
      const fallback = await fetch(`${API_BASE_URL}/api/club-members/screening`);
      if (fallback.ok) return await fallback.json();
      throw new Error(`HTTP ${response.status}: Failed to fetch screening members`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching screening members:', error);
    // Graceful fallback to filtering getClubMembers if route isn't available yet
    try {
      const allMembers = await getClubMembers();
      return Array.isArray(allMembers) ? allMembers.filter((m: any) => m.status === 'Under Screening' || !m.designation) : [];
    } catch {
      throw error;
    }
  }
};

export const getClubMembers = async () => {
  const url = `${API_BASE_URL}/api/club-members`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch club members`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching club members:', error);
    throw error;
  }
};

export const sendEmailDirect = async (payload: { type: 'screening' | 'card' | 'promotion' | 'resignation' | 'termination' | 'test'; member?: any; recipient?: string }) => {
  // Try local/same-origin serverless endpoint first, or production Vercel relay
  const relayUrls = [
    '/api/send-email',
    'https://techversectu.vercel.app/api/send-email',
  ];

  for (const url of relayUrls) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        return await response.json().catch(() => ({ success: true }));
      }
    } catch (e) {
      // try next relay url
    }
  }
  return { success: false, message: 'All email relays failed' };
};

export const promoteClubMember = async (
  id: string,
  promoteData: { designation: string; roleAssignee?: string; role?: string; previousDesignation?: string }
) => {
  const url = `${API_BASE_URL}/api/club-members/${id}/promote`;
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(promoteData),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      // Fallback to PUT /api/club-members/:id/promote or /role
      const fallback = await fetch(`${API_BASE_URL}/api/club-members/${id}/promote`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(promoteData),
      });
      if (fallback.ok) return await fallback.json();

      const fallbackRole = await fetch(`${API_BASE_URL}/api/club-members/${id}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...promoteData, status: 'Official Member' }),
      });
      if (fallbackRole.ok) return await fallbackRole.json();

      throw new Error(data.message || 'Failed to promote member');
    }

    return data;
  } catch (error) {
    console.error('Error promoting club member:', error);
    throw error;
  }
};

export const acceptMemberResignation = async (
  id: string,
  data: { remarks?: string; sendEmail?: boolean }
) => {
  const url = `${API_BASE_URL}/api/club-members/${id}/resign`;
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    let resData;
    try {
      resData = await response.json();
    } catch (e) {
      resData = {};
    }

    if (!response.ok) {
      const fallback = await fetch(`${API_BASE_URL}/api/club-members/${id}/resign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (fallback.ok) return await fallback.json();
      throw new Error(resData.message || 'Failed to accept member resignation');
    }

    return resData;
  } catch (error) {
    console.error('Error accepting member resignation:', error);
    throw error;
  }
};

export const terminateClubMember = async (
  id: string,
  data: { reason: string; remarks?: string; fineAmount?: number; sendEmail?: boolean }
) => {
  const url = `${API_BASE_URL}/api/club-members/${id}/terminate`;
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    let resData;
    try {
      resData = await response.json();
    } catch (e) {
      resData = {};
    }

    if (!response.ok) {
      const fallback = await fetch(`${API_BASE_URL}/api/club-members/${id}/terminate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (fallback.ok) return await fallback.json();
      throw new Error(resData.message || 'Failed to terminate club member');
    }

    return resData;
  } catch (error) {
    console.error('Error terminating club member:', error);
    throw error;
  }
};

export const updateClubMemberRole = async (
  id: string,
  updateData: { designation?: string; roleAssignee?: string; role?: string; status?: string }
) => {
  const url = `${API_BASE_URL}/api/club-members/${id}/role`;
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      // Retry with PUT /api/club-members/:id
      const fallbackResponse = await fetch(`${API_BASE_URL}/api/club-members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      if (fallbackResponse.ok) {
        return await fallbackResponse.json();
      }
      throw new Error(data.message || 'Failed to update member role');
    }

    return data;
  } catch (error) {
    console.error('Error updating club member role:', error);
    throw error;
  }
};

export const getEnquiries = async () => {
  const url = `${API_BASE_URL}/api/enquiry`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch enquiries`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    throw error;
  }
};

export const getContacts = async () => {
  const url = `${API_BASE_URL}/api/contact`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch contacts`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const getEngineersDayStats = async () => {
  const url = `${API_BASE_URL}/api/engineers-day/stats`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch stats`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching event stats:', error);
    throw error;
  }
};

export const adminLogin = async (credentials: { email: string; password: string }) => {
  const url = `${API_BASE_URL}/api/admin/login`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    let data: any = {};
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      const error: any = new Error(data.message || 'Admin login failed');
      error.status = response.status;
      error.response = { data };
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error during admin login:', error);
    throw error;
  }
};

export const verifyAdminToken = async (token: string) => {
  const url = `${API_BASE_URL}/api/admin/verify`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    let data: any = {};
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      return { valid: false };
    }

    return data;
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return { valid: false };
  }
};

export const deleteScreeningMember = async (id: string) => {
  const url = `${API_BASE_URL}/api/screening-members/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      // Fallback to /api/club-members/screening/:id or /api/club-members/:id
      const fallback = await fetch(`${API_BASE_URL}/api/club-members/screening/${id}`, { method: 'DELETE' });
      if (fallback.ok) return await fallback.json().catch(() => ({ success: true }));
      const fallback2 = await fetch(`${API_BASE_URL}/api/club-members/${id}`, { method: 'DELETE' });
      if (fallback2.ok) return await fallback2.json().catch(() => ({ success: true }));
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to delete screening member application');
    }
    return await response.json().catch(() => ({ success: true }));
  } catch (error) {
    console.error('Error deleting screening member:', error);
    throw error;
  }
};

export const deleteClubMember = async (id: string) => {
  const url = `${API_BASE_URL}/api/club-members/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to delete member application');
    }
    return await response.json().catch(() => ({ success: true }));
  } catch (error) {
    console.error('Error deleting club member:', error);
    throw error;
  }
};

export const deleteEnquiry = async (id: string) => {
  const url = `${API_BASE_URL}/api/enquiry/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to delete enquiry');
    }
    return await response.json().catch(() => ({ success: true }));
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    throw error;
  }
};

export const deleteContact = async (id: string) => {
  const url = `${API_BASE_URL}/api/contact/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to delete contact message');
    }
    return await response.json().catch(() => ({ success: true }));
  } catch (error) {
    console.error('Error deleting contact message:', error);
    throw error;
  }
};



