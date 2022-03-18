window.app_eclaim_transaksi_fLapView = function(owner,options, callObj)
{
    if (owner)
    {
		try{
	        window.app_eclaim_transaksi_fLapView.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_eclaim_transaksi_fLapView";
            this.setCaption("Dashboard");
			this.callObj = callObj;
			this.setColor("");
			this.maximize();
			this.onClose.set(this,"doClose");						
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new portalui_panel(this,{bound:[this.width / 2 - 300 ,5,600, this.height - 25], caption:""});						
			this.tab.setScroll(true);
			this.ed_klaim = new portalui_saiLabelEdit(this.tab,{bound:[20,1,300,20],caption:"No Berkas",readOnly:true});
			this.ed_asuransi = new portalui_saiLabelEdit(this.tab,{bound:[20,2,300,20],caption:"Jenis Asuransi",readOnly:true});
			this.ed_polis = new portalui_saiLabelEdit(this.tab,{bound:[20,3,300,20],caption:"No Polis",readOnly:true});
			this.ed_dok = new portalui_saiLabelEdit(this.tab,{bound:[20,4,300,20],caption:"No Dokumen",readOnly:true});
			this.ed_tgl = new portalui_saiLabelEdit(this.tab,{bound:[20,5,200,20],caption:"Tgl Kejadian",readOnly:true});
			this.ed_lokasi = new portalui_saiLabelEdit(this.tab,{bound:[20,6,500,20],caption:"Lokasi",readOnly:true});
			this.ed_lokasiAlm = new portalui_saiLabelEdit(this.tab,{bound:[20,7,500,20],caption:"Lokasi Kejadian",readOnly:true});
			this.ed_obyek = new portalui_saiLabelEdit(this.tab,{bound:[20,8,500,20],caption:"Obyek Kerugian",readOnly:true});
			this.ed_ket = new portalui_saiLabelEdit(this.tab,{bound:[20,9,500,20],caption:"Ket. Kerusakan",readOnly:true});
			this.ed_sebab = new portalui_saiLabelEdit(this.tab,{bound:[20,10,500,20],caption:"Penyebab Kerugian",readOnly:true});
			this.ed_penyebab = new portalui_saiLabelEdit(this.tab,{bound:[20,11,500,50],caption:"Kronologi",readOnly:true});
			this.ed_tindakan = new portalui_saiLabelEdit(this.tab,{bound:[20,12,500,20],caption:"Tindakan",readOnly:true});
			this.ed_kurs = new portalui_saiLabelEdit(this.tab,{bound:[20,9,150,20],caption:"Kode Curr",readOnly:true});			
			this.ed_nilai = new portalui_saiLabelEdit(this.tab,{bound:[20,13,200,20],caption:"Nilai Estimasi",readOnly:true,tipeText:ttNilai});
			//this.ed_adjust = new portalui_saiLabelEdit(this.tab,{bound:[20,8,200,20],caption:"Nilai Adjust",readOnly:true,tipeText:ttNilai});
			//this.ed_bayar = new portalui_saiLabelEdit(this.tab,{bound:[20,9,200,20],caption:"Nilai Bayar",readOnly:true,tipeText:ttNilai});			
			this.ed_pic = new portalui_saiLabelEdit(this.tab,{bound:[20,14,500,20],caption:"Contact Person",readOnly:true});			
			this.ed_telp = new portalui_saiLabelEdit(this.tab,{bound:[20,15,500,20],caption:"No Telepon",readOnly:true});			
			this.ed_fax = new portalui_saiLabelEdit(this.tab,{bound:[20,16,500,20],caption:"No Fax",readOnly:true});
			this.tab.rearrangeChild(30,23);
			this.bClose = new portalui_imageButton(this.tab,{bound:[this.tab.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});			
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_eclaim_transaksi_fLapView.extend(window.portalui_childForm);
window.app_eclaim_transaksi_fLapView.implement({    
	doClick: function(sender){
		this.hide();
		this.callObj.unblock();
	},
	setValue: function(value){
		var data = this.dbLib.getDataProvider("select a.no_klaim, a.kode_ttg, a.kode_lokasi, a.no_dokumen,a.no_polis, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.alamat, a.penyebab, "+
			"   a.nilai, a.kode_curr, a.tindakan, a.tgl_dokumen, a.nik_buat, a.tgl_input, a.kode_obyek, a.kode_sebab, "+
			"   a.kurs, a.kode_asuransi, a.kode_lok, a.periode, a.nik_user, a.pic, a.no_telp, a.no_fax, a.keterangan,a.penyebab,a.tindakan, "+
			"   h.nama as nama_ttg,c.nama as nama_obyek,d.nama as nama_sebab,g.nama as nama_lok,i.nama as nama_asuransi "+
						" from eclaim_klaim a inner join eclaim_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok "+
						" inner join eclaim_asuransi i on a.kode_lokasi=i.kode_lokasi and a.kode_asuransi=i.kode_asuransi "+
						"	left outer join eclaim_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek "+
						"	left outer join eclaim_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab "+
						"	left outer join eclaim_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim "+
						"	left outer join eclaim_bayar f on f.kode_lokasi = a.kode_lokasi and f.no_klaim = a.no_klaim "+
						"	left outer join eclaim_lokasi g on g.kode_lokasi = a.kode_lokasi and g.kode_lok = a.kode_lok "+
						"	left outer join eclaim_ttg h on h.kode_lokasi = a.kode_lokasi and h.kode_ttg = a.kode_ttg "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and  a.no_klaim = '"+value.klaim+"' ",true);
		if (typeof data != "string"){
			value = data.rs.rows[0];
			this.ed_klaim.setText(value.no_klaim);
			this.ed_asuransi.setText(value.nama_asuransi);
			this.ed_dok.setText(value.no_dokumen);
			this.ed_tgl.setText(value.tanggal);
			this.ed_lokasi.setText(value.nama_lok);
			this.ed_obyek.setText(value.nama_obyek);
			this.ed_ket.setText(value.keterangan);
			this.ed_sebab.setText(value.nama_sebab);
			this.ed_nilai.setText(floatToNilai(parseFloat(value.nilai)));
			//this.ed_adjust.setText(floatToNilai(parseFloat(value.adjust)));
			//this.ed_bayar.setText(floatToNilai(parseFloat(value.bayar)));		
			this.ed_polis.setText(value.no_polis);
			this.ed_lokasiAlm.setText(value.alamat);
			this.ed_kurs.setText(value.kode_curr);
			this.ed_pic.setText(value.pic);
			this.ed_telp.setText(value.no_telp);
			this.ed_fax.setText(value.no_fax);
			this.ed_penyebab.setText(value.penyebab);
			this.ed_tindakan.setText(value.tindakan)
		}
	},
	setPanelCaption: function(data){
		this.tab.setCaption(data);
	}
});