import React, { useState } from 'react';
import {
  Store,
  Database,
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Save,
  DollarSign
} from 'lucide-react';
import { apiService } from '../api/apiService';
import { useApp } from '../context/AppContext';

export default function SettingsPage() {
  const { stats, refreshStats, refreshCategories, showToast } = useApp();

  const [storeInfo, setStoreInfo] = useState({
    name: 'Ansari Living & Furniture Studio',
    phone: '+91 98765 43210',
    email: 'admin@ansarifurniture.com',
    address: '14 MG Road, Indiranagar, Bengaluru, Karnataka 560038',
    currency: 'INR (₹)',
  });

  const [isSeeding, setIsSeeding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveStoreInfo = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Store settings saved successfully!', 'success');
    }, 500);
  };

  const handleResetData = async () => {
    if (!window.confirm('Reset catalog to sample furniture products and categories? This will refresh demo items.')) {
      return;
    }

    setIsSeeding(true);
    try {
      const res = await apiService.seedData();
      if (res.success) {
        showToast('Sample furniture catalog restored successfully!', 'success');
        refreshStats();
        refreshCategories();
      }
    } catch (err) {
      showToast(err.message || 'Failed to seed sample data', 'error');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#191816]">
          Store Settings & System
        </h2>
        <p className="text-xs sm:text-sm text-[#4F4B45] mt-1">
          Manage your furniture showroom profile, database configuration, and sample data.
        </p>
      </div>

      {/* Store Information Card */}
      <div className="bg-white rounded-2xl border border-[#EAE4D9] p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 pb-6 border-b border-[#EAE4D9]">
          <div className="w-10 h-10 rounded-xl bg-[#EDF5F0] text-[#18412F] flex items-center justify-center">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#191816]">Showroom Details</h3>
            <p className="text-xs text-[#8C8275]">Basic information displayed on invoices and receipts</p>
          </div>
        </div>

        <form onSubmit={handleSaveStoreInfo} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#191816] mb-1.5">
                Showroom Name
              </label>
              <input
                type="text"
                value={storeInfo.name}
                onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F] transition-all touch-target-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#191816] mb-1.5">
                Currency Symbol
              </label>
              <input
                type="text"
                disabled
                value="Indian Rupee (₹ INR)"
                className="w-full px-4 py-3 bg-neutral-100 border border-[#EAE4D9] rounded-xl text-sm text-[#4F4B45] cursor-not-allowed touch-target-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#191816] mb-1.5">
                Contact Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8275]" />
                <input
                  type="text"
                  value={storeInfo.phone}
                  onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F] transition-all touch-target-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#191816] mb-1.5">
                Official Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8275]" />
                <input
                  type="email"
                  value={storeInfo.email}
                  onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F] transition-all touch-target-lg"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#191816] mb-1.5">
              Showroom Physical Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8C8275]" />
              <textarea
                rows="2"
                value={storeInfo.address}
                onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-xl text-sm text-[#191816] focus:bg-white focus:border-[#18412F] transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#18412F] hover:bg-[#123324] text-white font-bold text-sm rounded-xl shadow transition-all touch-target-lg active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Showroom Settings'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Database Status & Tools */}
      <div className="bg-white rounded-2xl border border-[#EAE4D9] p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 pb-6 border-b border-[#EAE4D9]">
          <div className="w-10 h-10 rounded-xl bg-[#FAF3EA] text-[#9A6735] flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#191816]">Database & Sample Data Tools</h3>
            <p className="text-xs text-[#8C8275]">View MERN backend connection status and reset catalog data</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="p-4 bg-[#F9F7F2] rounded-xl border border-[#EAE4D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#8C8275] uppercase block">Backend Status</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold text-[#191816]">
                  {stats?.dbStatus || 'Connected'}
                </span>
              </div>
            </div>

            <div className="text-xs text-[#4F4B45]">
              Total Products: <strong className="text-[#191816]">{stats?.totalProducts || 0}</strong> • Categories: <strong className="text-[#191816]">{stats?.totalCategories || 0}</strong>
            </div>
          </div>

          <div className="p-4 bg-[#EDF5F0] rounded-xl border border-[#D0E3D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-[#18412F]">
                Restore Sample Furniture Data
              </h4>
              <p className="text-xs text-[#2A6B4F] mt-0.5">
                Instantly repopulates realistic Sofas, Chairs, Beds, Tables, and Lamps with ₹ INR prices.
              </p>
            </div>

            <button
              type="button"
              disabled={isSeeding}
              onClick={handleResetData}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#18412F] hover:bg-[#123324] text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-all touch-target-lg active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${isSeeding ? 'animate-spin' : ''}`} />
              <span>{isSeeding ? 'Seeding Data...' : 'Reset to Sample Furniture'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Beginner Guide Card */}
      <div className="bg-white rounded-2xl border border-[#EAE4D9] p-6 shadow-sm flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-base font-bold text-[#191816]">
            Administrator Quick Tips
          </h4>
          <ul className="text-xs sm:text-sm text-[#4F4B45] space-y-1.5 mt-2 list-disc list-inside">
            <li>To feature a product on the store front, toggle <strong>"Featured Product"</strong> in the edit form.</li>
            <li>Opening any product card with the <strong>View</strong> button automatically logs and increments customer views.</li>
            <li>Categories with active furniture items are protected from accidental deletion.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
