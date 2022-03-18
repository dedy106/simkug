window.app_eclaim3_transaksi_fLapAwal = function(owner)
{
	if (owner)
	{
		window.app_eclaim3_transaksi_fLapAwal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim3_transaksi_fLapAwal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Laporan Awal: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");						
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Kejadian", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Claim",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Dokumen", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 
		this.cb_polis = new saiCBBL(this,{bound:[20,14,250,20],caption:"No Polis", multiSelection:false, maxLength:10, tag:2});
		this.cb_sebab = new saiCBBL(this,{bound:[20,15,220,20],caption:"Penyebab", multiSelection:false, maxLength:10, tag:2});
		this.cb_objek = new saiCBBL(this,{bound:[20,16,220,20],caption:"Objek", multiSelection:false, maxLength:10, tag:2});
		this.cb_lokasi = new saiCBBL(this,{bound:[20,17,220,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2});
		this.cb_curr = new saiCBBL(this,{bound:[20,18,220,20],caption:"Currency", multiSelection:false, maxLength:10, tag:2});
		this.cb_buat = new saiCBBL(this,{bound:[20,19,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,20,220,20],caption:"Nilai Estimasi", tag:1, tipeText:ttNilai, text:"0"});		
		this.e_alamat = new saiLabelEdit(this,{bound:[20,21,450,20],caption:"Lokasi Kejadian", maxLength:150});		
		this.e_pic = new saiLabelEdit(this,{bound:[20,22,450,20],caption:"Contact Person", maxLength:50});		
		this.e_tel = new saiLabelEdit(this,{bound:[20,23,450,20],caption:"No Telpon", maxLength:50});		
		this.e_fax = new saiLabelEdit(this,{bound:[20,24,450,20],caption:"No Fax", maxLength:50});		
		this.e_kejadian = new saiMemo(this,{bound:[20,22,450,60],caption:"Kronologi"});
		this.e_tindakan = new saiMemo(this,{bound:[20,23,450,60],caption:"Tindakan"});		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_polis.setSQL("select no_polis, keterangan from tlk_polis where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",["no_polis","keterangan"],false,["No Polis","Keterangan"],"and","Data Polis",true);
			this.cb_sebab.setSQL("select kode_sebab, nama from tlk_sebab where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",["kode_sebab","nama"],false,["No Polis","Keterangan"],"and","Data Sebab",true);			
			this.cb_objek.setSQL("select kode_obyek, nama from tlk_obyek where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",["kode_obyek","nama"],false,["Kode","Nama"],"and","Data Objek",true);			
			this.cb_lokasi.setSQL("select kode_lok, nama from tlk_lokasi where kode_lokasi = '"+this.app._lokasi+"'  and kode_ttg='"+this.app._kodeTtg+"'",["kode_lok","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.cb_curr.setSQL("select kode_curr,nama from curr",["kode_curr","nama"],false,["Kode","Nama"],"and","Data Currency",true);			
			this.cb_buat.setSQL("select nik, nama from tlk_hakakses where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_buat.setText(this.app._userLog);
			this.polis=this.dbLib.getPeriodeFromSQL("select no_polis as periode from tlk_polis where flag_aktif='1' ");
			this.cb_polis.setText(this.polis);
			this.cb_curr.setText("IDR");
			this.jenisAsuransi = "P12";
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_eclaim3_transaksi_fLapAwal.extend(window.childForm);
window.app_eclaim3_transaksi_fLapAwal.implement({	
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into tlk_klaim (no_klaim,kode_ttg,periode,tanggal,alamat,kode_curr,nik_buat,kode_obyek,kode_sebab,kode_asuransi,penyebab,progress,kode_lok,no_dokumen,no_polis,tgl_dokumen,nilai,kode_lokasi,tgl_input,nik_user,host,ip,tindakan,pic,no_tel,no_fax,no_ver,kurs,status) values "+
							"('"+this.e_nb.getText()+"','"+this.app._kodeTtg+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_alamat.getText()+"','"+this.cb_curr.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_objek.getText()+"','"+this.cb_sebab.getText()+"','"+this.jenisAsuransi+"','"+this.e_kejadian.getText()+"','0','"+this.cb_lokasi.getText()+"','"+this.e_dok.getText()+"','"+this.cb_polis.getText()+"','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._lokasi+"',now(),'"+this.app._userLog+"','"+this.app._hostname+"','"+this.app._iphost+"','"+this.e_tindakan.getText()+"','"+this.e_pic.getText()+"','"+this.e_tel.getText()+"','"+this.e_fax.getText()+"','-',1,'1')");
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
					this.doReport(this.e_nb.getText());
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);					
					this.doClick();
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.doClick();
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_klaim','no_klaim',"KLM/BDG/"+this.e_periode.getText().substring(2)+".",'000'));
		this.e_dok.setFocus();
		setTipeButton(tbSimpan);
	},	
	doReport: function(noklaim){
		try{
			this.nama_report="server_report_eclaim3_rptLapAwalMail";
			this.filter = " where a.no_klaim='"+noklaim+"' ";
			this.filter2 = this.app._email+"/"+this.app._emailadm+"/"+this.app._emailttg+"/"+this.app._userStatus+"/"+this.app._fromadm;
			this.viewer.prepare();
			this.viewer.setVisible(true);
			this.app._mainForm.pButton.setVisible(false);
			this.app._mainForm.reportNavigator.setVisible(true);
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			this.showFilter = "";
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
			this.page = 1;
			this.allBtn = false;
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});