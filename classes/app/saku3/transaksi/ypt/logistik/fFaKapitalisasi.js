window.app_saku3_transaksi_ypt_logistik_fFaKapitalisasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_logistik_fFaKapitalisasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_logistik_fFaKapitalisasi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kapitalisasi Aktiva Tetap", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Kapitalisasi", underline:true});
        this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 	
        
        this.pc2 = new pageControl(this,{bound:[5,10,1000,430], childPage:["Data Kapitalisasi","List Kapitalisasi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
					colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,390,180,80,100]],colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Kapitalisasi",click:[this,"doLoad3"]});				

        this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
        this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
        this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,300,20],caption:"No Dokumen",maxLength:20, tag:1});	
        this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,432,20],caption:"Deskripsi",maxLength:200, tag:1});
        this.cb_nofa = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"No Aktiva Tetap", multiSelection:false, tag:1,change:[this,"doChange"]});
		this.e_nama = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,432,20],caption:"Deskripsi",maxLength:150,tag:1,readOnly:true});				
		this.e_seri = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,432,20],caption:"Nomor Seri",maxLength:50, tag:1,readOnly:true});
        this.e_merk = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,432,20],caption:"Merk",maxLength:100, tag:1,readOnly:true});
        this.e_tipe = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,432,20],caption:"Tipe",maxLength:100, tag:1,readOnly:true});
        this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,20,200,20],caption:"Nilai Perolehan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
        this.e_umur = new saiLabelEdit(this.pc2.childPage[0],{bound:[252,20,200,20],caption:"Umur [Bulan]", tag:1, tipeText:ttNilai, readOnly:true,text:"0",change:[this,"doChange"]});
        this.e_persen = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,21,200,20],caption:"% Susut [Tahun]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
        this.e_nilsusut = new saiLabelEdit(this.pc2.childPage[0],{bound:[252,21,200,20],caption:"Nilai Susut [Bulan]", tag:1, tipeText:ttNilai, text:"0",readOnly:true});   
        this.e_akunfa = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,27,200,20],caption:"Akun Asset",maxLength:100, tag:1,readOnly:true});   
        this.c_periode = new saiCB(this.pc2.childPage[0],{bound:[20,22,200,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});	
        this.cb_noju = new saiCBBL(this.pc2.childPage[0],{bound:[20,23,220,20],caption:"No Jurnal", multiSelection:false, tag:1,change:[this,"doChange"]});
        this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,24,220,20],caption:"Akun Jurnal", multiSelection:false, tag:1,change:[this,"doChange"]});	  
        this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,25,200,20],caption:"Saldo Jurnal", tag:1, tipeText:ttNilai, text:"0",readOnly:true});      
        this.e_nilkap = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,26,200,20],caption:"Nilai Kapitalisasi", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});

        
		
        this.rearrangeChild(10, 23);
        this.pc2.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			this.stsSimpan = 1;					
			this.doSelectDate(this.dp_d2,this.dp_d2.year,this.dp_d2.month,this.dp_d2.day);
			
           
            this.cb_nofa.setSQL("select no_fa, nama from fa_asset where kode_lokasi='"+this.app._lokasi+"' and no_fa like '"+this.app._lokasi+"-FA%' ",["no_fa","nama"],false,["Kode","Nama"],"and","Data Asset",true);

            this.c_periode.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode from gldt where kode_lokasi='"+this.app._lokasi+"' union select distinct periode from gldt_h where kode_lokasi='"+this.app._lokasi+"' order by periode desc ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode.addItem(i,line.periode);
				}
			}		
			this.c_periode.setText("");	

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_logistik_fFaKapitalisasi.extend(window.childForm);
window.app_saku3_transaksi_ypt_logistik_fFaKapitalisasi.implement({
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
            if (this.stsSimpan == 1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-KP"+this.e_periode.getText().substr(2,4)+".","0000"));					
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					if(this.stsSimpan == 0){

						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
                        sql.add("delete from fa_kapital_d where no_kapital = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
                        sql.add("delete from fa_nilai where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					}
                        
                    sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
					"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','FA','KAPITAL','F','-','-','"+this.app._kodePP+"','"+this.dp_d2.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilkap.getText())+",0,0,'-','-','-','-','"+this.e_dok.getText()+"','-','-','-','-')");


					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
					"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d2.getDateString()+"',0,'"+this.e_akunfa.getText()+"','D',"+parseNilai(this.e_nilkap.getText())+","+
                    parseNilai(this.e_nilkap.getText())+",'"+this.e_ket.getText()+"','FA','-','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");

                    sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
					"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d2.getDateString()+"',1,'"+this.cb_akun.getText()+"','C',"+parseNilai(this.e_nilkap.getText())+","+
                    parseNilai(this.e_nilkap.getText())+",'"+this.e_ket.getText()+"','FA','-','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
                    
					sql.add("insert into fa_kapital_d(no_kapital,kode_lokasi,no_fa,no_bukti,nu,nilai_pakai,kode_akun) values "+
                            "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_nofa.getText()+"','"+this.cb_noju.getText()+"',0,"+parseNilai(this.e_nilkap.getText())+",'"+this.cb_akun.getText()+"')");
                            
                    sql.add("insert into fa_nilai(no_fa,kode_lokasi,no_bukti,dc,nilai,periode) values "+
                            "('"+this.cb_nofa.getText()+"','"+this.app._lokasi+"','"+this.e_nb.getText()+"','D',"+parseNilai(this.e_nilkap.getText())+",'"+this.e_periode.getText()+"')");
                    			
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
			case "ubah"	:
                if (parseFloat(this.e_nilkap.getText()) > parseFloat(this.e_saldo.getText())){
                    system.alert(this,"Nilai Kapitalisasi tidak valid.","Nilai Kapitalisasi tidak boleh kurang dari Saldo Jurnal.["+this.e_saldo.getText()+"]");
                    return false;
                }	
                if (parseFloat(this.e_nilkap.getText()) <= 0){
                    system.alert(this,"Nilai Kapitalisasi tidak valid.","Nilai Kapitalisasi tidak boleh 0 atau kurang .["+this.e_saldo.getText()+"]");
                    return false;
                }	
                if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}							
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
                    }
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
                    sql.add("delete from fa_kapital_d where no_kapital = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
                    sql.add("delete from fa_nilai where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;		
		}
	},
	
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick();
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0) {
				this.sg3.clear(1); 
			}
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-KP"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
			this.stsSimpan = 1;
			setTipeButton(tbSimpan);
		}
	},
	doChange:function(sender){	
		if (sender == this.cb_nofa && this.cb_nofa.getText() != "" ) {
			var data = this.dbLib.getDataProvider(
			           "select a.nama,a.merk,a.tipe,a.kode_akun,a.no_seri,b.nilai,a.umur,a.persen "+
                       "from fa_asset a "+
                       "inner join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as nilai from fa_nilai group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_fa ='"+this.cb_nofa.getText()+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
                    this.e_nama.setText(line.nama);	
                    this.e_seri.setText(line.no_seri);	
                    this.e_merk.setText(line.merk);
                    this.e_tipe.setText(line.tipe);
                    this.e_nilai.setText(floatToNilai(line.nilai));	
                    this.e_akunfa.setText(line.kode_akun);
                    this.e_umur.setText(floatToNilai(line.umur));
                    this.e_persen.setText(floatToNilai(line.persen));
                    var nilsusut = Math.round(nilaiToFloat(this.e_nilai.getText())*nilaiToFloat(this.e_persen.getText())/100/12);
                    this.e_nilsusut.setText(floatToNilai(nilsusut));
				} 
			} 
        }
       
        if (sender == this.c_periode && this.c_periode.getText() != "" && this.stsSimpan == 1){
			this.cb_noju.setText("");
			this.cb_akun.setText("");
			this.e_saldo.setText(0);

            this.cb_noju.setSQL("select distinct no_bukti,keterangan from gldt where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.c_periode.getText()+"' "+
            "union "+
			"select distinct no_bukti,keterangan from gldt_h where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.c_periode.getText()+"' ",["no_bukti","keterangan"],false,["No Bukti","Keterangan"],"and","Data Jurnal",true);				
        }
        if (sender == this.cb_noju) {
			if(this.cb_noju.getText() != "" && this.stsSimpan == 1){
            this.cb_akun.setSQL("select a.kode_akun, b.nama as nama_akun "+
            "from gldt a "+
            "inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi='"+this.app._lokasi+"' "+
            "where a.no_bukti='"+this.cb_noju.getText()+"' and a.dc='D' and a.periode='"+this.c_periode.getText()+"' "+
            "union "+
            "select a.kode_akun, b.nama as nama_akun "+
            "from gldt_h a "+
            "inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi='"+this.app._lokasi+"' "+
			"where a.no_bukti='"+this.cb_noju.getText()+"' and a.dc='D' and a.periode='"+this.c_periode.getText()+"' ",["kode_akun","nama_akun"],false,["Kode","Nama"],"and","Data Akun",true);	
			}
			else if(this.cb_noju.getText() == ""){
				this.cb_akun.setText("");
				this.e_saldo.setText(0);
			}
        }
        if (sender == this.cb_akun) {
			if(this.cb_akun.getText() != "" && this.stsSimpan == 1) {
				var data = this.dbLib.getDataProvider(
                "select sum(case dc when 'D' then a.nilai else -a.nilai end)-isnull(b.nilai,0) as saldo from gldt a "+
                "left join (select no_bukti,kode_lokasi,sum(nilai_pakai) as nilai  "+
                "           from fa_kapital_d group by no_bukti,kode_lokasi ) b "+
                "           on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
                "where a.kode_akun ='"+this.cb_akun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.cb_noju.getText()+"' "+
                "group by a.no_bukti,b.nilai "+
                "union "+
                "select sum(case dc when 'D' then a.nilai else -a.nilai end)-isnull(b.nilai,0) as saldo "+ 
                "from gldt_h a "+
                "left join (select no_bukti,kode_lokasi,sum(nilai_pakai) as nilai "+
                "           from fa_kapital_d group by no_bukti,kode_lokasi ) b "+
                "           on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
                "where a.kode_akun ='"+this.cb_akun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.cb_noju.getText()+"' "+
                "group by a.no_bukti,b.nilai ",true);

				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_saldo.setText(floatToNilai(line.saldo));	
						this.e_nilkap.setText(floatToNilai(line.saldo));			
					} 
				} 
			}else if(this.cb_akun.getText() == ""){
				this.e_saldo.setText(0);
			}
        }
        if (sender == this.e_nilkap && this.e_nilkap.getText() != "") {
            
            if(this.stsSimpan == 1) {
                var data = this.dbLib.getDataProvider(
                    "select isnull(b.nilai,0) as nilai "+
                    "from fa_asset a "+
                    "inner join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as nilai from fa_nilai group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
                    "where a.no_fa ='"+this.cb_nofa.getText()+"'",true);
            }else{
                var data = this.dbLib.getDataProvider(
                    "select isnull(b.nilai,0) as nilai "+
                    "from fa_asset a "+
                    "inner join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as nilai from fa_nilai where no_bukti <> '"+this.e_nb.getText()+"' group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
                    "where a.no_fa ='"+this.cb_nofa.getText()+"'",true);
            }
           
                if (typeof data == "object"){
                    var line = data.rs.rows[0];							
                    if (line != undefined){
                        var nil_p = nilaiToFloat(line.nilai) + nilaiToFloat(this.e_nilkap.getText());
                        this.e_nilai.setText(floatToNilai(nil_p));	
                        var nilsusut = Math.round(nilaiToFloat(this.e_nilai.getText())*nilaiToFloat(this.e_persen.getText())/100/12);
                        this.e_nilsusut.setText(floatToNilai(nilsusut));
                    }
                }			        
        }
        
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
    },
    doLoad3:function(sender){			
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai1 "+
		             "from trans_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.modul='FA' and a.kode_lokasi='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai1)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
                
                var strSQL2 ="select a.no_bukti,a.tanggal,a.no_dokumen,a.keterangan,b.kode_akun as kode_akunju, b.no_fa,a.nilai1 as nilkap,b.no_bukti as no_ju "+
                "from trans_m a "+
                "inner join fa_kapital_d b on a.no_bukti=b.no_kapital and a.kode_lokasi=b.kode_lokasi "+
                "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
				var data2 = this.dbLib.getDataProvider(strSQL2,true);
				if (typeof data2 == "object"){
					var line2 = data2.rs.rows[0];							
					if (line2 != undefined){	
						this.dp_d2.setText(line2.tanggal);
						this.e_dok.setText(line2.no_dokumen);
						this.e_ket.setText(line2.keterangan);
                        this.cb_nofa.setText(line2.no_fa);
                        this.cb_noju.setText(line2.no_ju);
                        this.cb_akun.setText(line2.kode_akunju);
					}
                }

                var strSQL ="select a.nama,a.merk,a.tipe,a.kode_akun,a.no_seri,b.nilai,a.umur,a.persen "+
                "from fa_asset a "+
                "inner join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as nilai from fa_nilai where no_bukti <> '"+this.e_nb.getText()+"' and no_fa='"+this.cb_nofa.getText()+"' group by no_fa,kode_lokasi ) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
                "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_fa='"+this.cb_nofa.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_nama.setText(line.nama);	
                        this.e_seri.setText(line.no_seri);	
                        this.e_merk.setText(line.merk);
                        this.e_tipe.setText(line.tipe);
                        this.e_nilai.setText(floatToNilai(line.nilai));	
                        this.e_akunfa.setText(line.kode_akun);
                        this.e_umur.setText(floatToNilai(line.umur));
                        this.e_persen.setText(floatToNilai(line.persen));   
					}
                }

                var data3 = this.dbLib.getDataProvider(
                    "select sum(case dc when 'D' then a.nilai else -a.nilai end) as saldo,isnull(b.nilai,0) as nilkap from gldt a "+
                    "left join (select no_bukti,kode_lokasi,sum(nilai_pakai) as nilai  "+
                    "           from fa_kapital_d where no_kapital ='"+this.e_nb.getText()+"' group by no_bukti,kode_lokasi ) b "+
                    "           on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
                    "where a.kode_akun ='"+this.cb_akun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.cb_noju.getText()+"' "+
                    "group by a.no_bukti,b.nilai "+
                    "union "+
                    "select sum(case dc when 'D' then a.nilai else -a.nilai end) as saldo,isnull(b.nilai,0) as nilkap "+ 
                    "from gldt_h a "+
                    "left join (select no_bukti,kode_lokasi,sum(nilai_pakai) as nilai "+
                    "           from fa_kapital_d where no_kapital ='"+this.e_nb.getText()+"' group by no_bukti,kode_lokasi ) b "+
                    "           on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
                    "where a.kode_akun ='"+this.cb_akun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.cb_noju.getText()+"' "+
                    "group by a.no_bukti,b.nilai ",true);
    
                if (typeof data3 == "object"){
                    var line3 = data3.rs.rows[0];							
                    if (line3 != undefined){
                        this.e_saldo.setText(floatToNilai(line3.saldo));	
                        this.e_nilkap.setText(floatToNilai(line3.nilkap));			
                    } 
                } 

                var strSQL4 ="select distinct periode from gldt where kode_lokasi='"+this.app._lokasi+"' and no_bukti='"+this.cb_noju.getText()+"' "+
                "union "+
                "select distinct periode from gldt_h "+
                "where kode_lokasi='"+this.app._lokasi+"' and no_bukti='"+this.cb_noju.getText()+"' ";
				var data4 = this.dbLib.getDataProvider(strSQL4,true);
				if (typeof data4 == "object"){
					var line4 = data4.rs.rows[0];							
					if (line4 != undefined){	
						this.c_periode.setText(line4.periode);
					}
                }

			}									
		} catch(e) {alert(e);}
	}

});