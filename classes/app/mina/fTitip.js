window.app_mina_fTitip = function(owner)
{
	if (owner)
	{
		window.app_mina_fTitip.prototype.parent.constructor.call(this,owner);
		this.className  = "app_mina_fTitip";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Titipan Uang : Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,225,20],caption:"No Dokumen", maxLength:50});		
		this.cb_agg = new saiCBBL(this,{bound:[20,15,200,20],caption:"Anggota", multiSelection:false, maxLength:10, tag:1, readOnly:true, change:[this,"doChange"]});
		this.cb_upline = new saiCBBL(this,{bound:[20,16,200,20],caption:"Upline", readOnly:true});
		this.cb_ajak = new saiCBBL(this,{bound:[20,17,200,20],caption:"Pengajak",  readOnly:true});
		this.e_jenis = new saiLabelEdit(this,{bound:[20,13,180,20],caption:"Jenis", readOnly:true});		
		this.e_nilai = new saiLabelEdit(this,{bound:[20,18,180,20],caption:"Nilai Titipan", tag:1, tipeText:ttNilai, text:"0",  readOnly:true});
	
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
			
			this.cb_agg.setSQL("select kode_agg, nama from mina_agg where status_aktif='0'",["kode_agg","nama"],false,["Kode","Nama"],"and","Data Anggota",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_mina_fTitip.extend(window.childForm);
window.app_mina_fTitip.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"mina_titip_m","no_titip","TTP-"+this.e_periode.getText().substr(2,4)+".","000"));		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update mina_agg set status_aktif='1' where kode_agg='"+this.cb_agg.getText()+"'");
					sql.add("insert into mina_titip_m(no_titip,no_dok,tanggal,periode,kode_agg,kode_ajak,kode_upline,nilai,nik_user,tgl_input) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.cb_agg.getText()+"','"+this.cb_ajak.getText()+"','"+this.cb_upline.getText()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"',getdate())");					
										
					var data = this.dbLib.getDataProvider("select kode_param,jumlah,nilai from mina_param where kode_param not in ('P00','P07') order by kode_param",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;						
						for (var i in data.rs.rows){
							line = data.rs.rows[i];		
							var jumlah = parseFloat(line.jumlah);
							if (line.kode_param == "P05") {
								sql.add("insert into mina_titip_d(no_titip,kode_agg,kode_param,nilai) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_ajak.getText()+"','"+line.kode_param+"',"+line.nilai+")");
							} 
							else {
								var kodeagg = this.cb_agg.getText();
								for (var j=0;j < jumlah;j++) {								
									if (j==0) var data2 = this.dbLib.getDataProvider("select kode_agg as kode_upline from mina_agg where kode_agg='"+kodeagg+"' ",true);
									else var data2 = this.dbLib.getDataProvider("select kode_upline from mina_agg where kode_agg='"+kodeagg+"' ",true);
									
									if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
										var line2 = data2.rs.rows[0];							
										kodeagg = line2.kode_upline;
										if (line.kode_param == "P01" && kodeagg == this.cb_agg.getText()) continue;
										sql.add("insert into mina_titip_d(no_titip,kode_agg,kode_param,nilai) values "+
											"('"+this.e_nb.getText()+"','"+kodeagg+"','"+line.kode_param+"',"+line.nilai+")");
									}									
								}
							}
						}
					} 			
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;						
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");	
	},
	doChange: function(sender){		
		if (sender == this.cb_agg && this.cb_agg.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.kode_ajak,isnull(b.nama,'-') as nama_ajak,a.kode_upline,isnull(c.nama,'-') as nama_upline,a.jenis "+
			           "from mina_agg a "+
			           "	left join mina_agg b on a.kode_ajak=b.kode_agg "+
			           "	left join mina_agg c on a.kode_upline=c.kode_agg "+					   
					   "where a.kode_agg='"+this.cb_agg.getText()+"' ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.cb_ajak.setText(line.kode_ajak,line.nama_ajak);
					this.cb_upline.setText(line.kode_upline,line.nama_upline);
					this.e_jenis.setText(line.jenis);
				} 				
			}
			if (this.e_jenis.getText() == "MINAPLUS") var kode_param = "P07"; else var kode_param = "P00";
			var data = this.dbLib.getDataProvider("select nilai from mina_param where kode_param='"+kode_param+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.e_nilai.setText(floatToNilai(line.nilai));
			} else this.e_nilai.setText("0");			
		}
	},
	doClick: function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"mina_titip_m","no_titip","TTP-"+this.e_periode.getText().substr(2,4)+".","000"));		
		this.e_dok.setFocus();
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});