import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple .env parser since dotenv might not be installed
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.trim();
    }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseAnonKey = env['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Error: Missing Supabase URL or Key in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const createAdmin = async () => {
    const email = "ashutoshsalunkhe2004@gmail.com";
    const password = "qazq1234";

    console.log(`Attempting to register user: ${email}`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: 'Admin User',
            }
        } // Auto-confirm handled by Supabase settings usually, or request verification
    });

    if (error) {
        console.error("Error creating user:", error.message);
    } else {
        console.log("User creation response:", data);
        if (data.user && data.user.identities && data.user.identities.length === 0) {
            console.log("User already exists (identities empty).");
        } else {
            console.log("User created successfully!");
        }
    }
};

createAdmin();
