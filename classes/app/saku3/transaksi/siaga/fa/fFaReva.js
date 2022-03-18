window.app_saku3_transaksi_siaga_fa_fFaReva = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_fa_fFaReva.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_fa_fFaReva";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Revaluasi Data Aktiva Tetap : Input", 0);	
				
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,432,20],caption:"Deskripsi", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		
		this.cb_fa = new saiCBBL(this,{bound:[20,10,220,20],caption:"No Aktap",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,18,432,20],caption:"Deskripsi",maxLength:150, tag:1, readOnly:true});		
		this.e_seri = new portalui_saiLabelEdit(this,{bound:[500,18,432,20],caption:"Nomor Seri",maxLength:50, tag:1, readOnly:true});
		this.e_merk = new portalui_saiLabelEdit(this,{bound:[20,17,432,20],caption:"Merk",maxLength:100, tag:1, readOnly:true});
		this.e_tipe = new portalui_saiLabelEdit(this,{bound:[500,17,432,20],caption:"Tipe",maxLength:100, tag:1, readOnly:true});		
		this.e_nilai = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Nilai Perolehan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_eval = new saiLabelEdit(this,{bound:[250,18,200,20],caption:"Nilai Revaluasi", tag:1, tipeText:ttNilai, text:"0"});						
		this.e_totSusut = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Total Penyusutan", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		this.e_umur = new saiLabelEdit(this,{bound:[250,19,200,20],caption:"Umur [Bulan]", tag:1, tipeText:ttNilai, text:"0"});				
		this.e_buku = new saiLabelEdit(this,{bound:[20,20,200,20],caption:"Nilai Buku", tag:1, tipeText:ttNilai, text:"0", readOnly:true});						
		this.e_residu = new saiLabelEdit(this,{bound:[250,20,200,20],caption:"Nilai Residu", tag:1, tipeText:ttNilai, text:"0"});		
		this.cb_bukti = new saiCBBL(this,{bound:[20,22,220,20],caption:"Bukti Jurnal", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		
		this.p1 = new panel(this,{bound:[20,23,980,230],caption:"Data Jurnal"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:5,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai"],
					colWidth:[[4,3,2,1,0],[100,400,50,250,100]],
					colFormat:[[4],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});	
		
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
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_fa_fFaReva.extend(window.childForm);
window.app_saku3_transaksi_siaga_fa_fFaReva.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					this.doClick(this.i_gen);
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					sql.add("insert into fa_reva_m(no_reva,kode_lokasi,periode,tanggal,keterangan,nik_buat,tgl_input,nik_user,no_bukti,no_fa,nilai,nilai_reva,umur,umur_reva,residu,residu_reva) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_bukti.getText()+"','"+this.cb_fa.getText()+"',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_eval.getText())+","+this.umur+","+parseNilai(this.e_umur.getText())+","+this.residu+","+parseNilai(this.e_residu.getText())+")");					
					
					sql.add("update fa_asset set umur="+parseNilai(this.e_umur.getText())+",nilai="+parseNilai(this.e_eval.getText())+",nilai_residu="+parseNilai(this.e_residu.getText())+",nik_user='"+this.app.userLog+"',tgl_input=getdate() where no_fa='"+this.cb_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					
					var selisih = nilaiToFloat(this.e_eval.getText()) - nilaiToFloat(this.e_nilai.getText());
					if (selisih > 0) var dc = "D"; else var dc = "C";

					sql.add("insert into fa_nilai(no_fa,kode_lokasi,no_bukti,dc,nilai,periode) values "+
							"('"+this.cb_fa.getText()+"','"+this.app._lokasi+"','"+this.e_nb.getText()+"','"+dc+"',"+Math.abs(selisih)+",'"+this.e_periode.getText()+"')");

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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_fa);
					setTipeButton(tbSimpan);
					this.sg.clear(1);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_eval.getText()) < nilaiToFloat(this.e_totSusut.getText())){
					system.alert(this,"Transaksi tidak valid.","Nilai Revaluasi kurang dari Total Penyusutan.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);
			if (m=="01") this.Aperiode = "A";
			if (m=="02") this.Aperiode = "B";
			if (m=="03") this.Aperiode = "C";
			if (m=="04") this.Aperiode = "D";
			if (m=="05") this.Aperiode = "E";
			if (m=="06") this.Aperiode = "F";
			if (m=="07") this.Aperiode = "G";
			if (m=="08") this.Aperiode = "H";
			if (m=="09") this.Aperiode = "I";
			if (m=="10") this.Aperiode = "J";
			if (m=="11") this.Aperiode = "K";
			if (m=="12") this.Aperiode = "L";			
		}
		else {
			this.e_periode.setText(this.app._periode);		
			if (m=="13") this.Aperiode = "M";			
			if (m=="14") this.Aperiode = "N";			
			if (m=="15") this.Aperiode = "O";			
			if (m=="16") this.Aperiode = "P";						
		}
		var strSQL = "select no_kas as no_bukti,keterangan,'KAS' as modul from kas_m where kode_lokasi='"+this.app._lokasi+"' and periode <='"+this.e_periode.getText()+"' and no_kas in (select distinct a.no_kas from kas_j a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag='006' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode <='"+this.e_periode.getText()+"') "+
			         "union "+
				     "select no_ju as no_ju,keterangan,'JU' as modul from ju_m where kode_lokasi='"+this.app._lokasi+"' and periode <='"+this.e_periode.getText()+"' and no_ju in (select distinct a.no_ju from ju_j a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag='006' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode <='"+this.e_periode.getText()+"')";							 
		this.cb_bukti.setSQL(strSQL,["no_bukti","keterangan","modul"],false,["No Bukti","Keterangan","Modul"],"and","Data Bukti Jurnal",true);
		this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.e_periode.getText()!= "" ) {				
				var AddFormat = "/"+this.Aperiode+"/"+this.e_periode.getText().substr(2,2);
				var data = this.dbLib.getDataProvider("select isnull(max(substring(no_reva,5,20)),0) as no_reva from fa_reva_m where no_reva like '_______"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.no_reva == "0") this.e_nb.setText("EVFA001"+AddFormat);
						else {
							var idx = parseFloat(line.no_reva.substr(0,3)) + 1;
							idx = idx.toString();							
							if (idx.length == 1) var nu = "00"+idx;
							if (idx.length == 2) var nu = "0"+idx;
							if (idx.length == 3) var nu = idx;
							this.e_nb.setText("EVFA"+nu+AddFormat);
						}
					} 
				}
				this.e_ket.setFocus();
			}
		}		
	},
	doChange:function(sender){	
		if (sender == this.cb_bukti) {
			if (this.cb_bukti.dataFromList[2].toUpperCase() == "JU") {
				strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai "+
						 "from ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_ju = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";									 
			}
			else {				
				strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai "+
						 "from kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_kas = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";									 
			}
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);			
		}
		if (sender == this.cb_fa && this.cb_fa.getText() != ""){
			this.standarLib.clearByTag(this, new Array("1"),undefined);
			var strSQL = "select a.nama,a.no_seri,a.merk,a.tipe,a.nilai,a.nilai_residu,isnull(d.tot_susut,0) as tot_susut,(a.nilai-a.nilai_residu-isnull(d.tot_susut,0)) as nilai_buku,a.umur "+
						 "from fa_asset a  "+						 
						 "left join "+
						 "   (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
						 "	  from fasusut_d group by no_fa,kode_lokasi) d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi "+
						 "where a.no_fa='"+this.cb_fa.getText()+"' and a.progress in ('2') and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){	
					this.e_nama.setText(line.nama);
					this.e_seri.setText(line.no_seri);
					this.e_tipe.setText(line.tipe);
					this.e_merk.setText(line.merk);
					this.e_nilai.setText(floatToNilai(line.nilai));
					this.e_residu.setText(floatToNilai(line.nilai_residu));
					this.e_totSusut.setText(floatToNilai(line.tot_susut));
					this.e_buku.setText(floatToNilai(line.nilai_buku));					
					this.e_umur.setText(floatToNilai(line.umur));	
					this.e_eval.setText(floatToNilai(line.nilai));					
					
					this.umur = parseFloat(line.umur);
					this.residu = parseFloat(line.nilai_residu);
				}
			}
		}		
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_fa) {   
			    this.standarLib.showListData(this, "Daftar Aktiva Tetap",sender,undefined, 
											  "select no_fa, nama  from fa_asset where progress in ('2') and kode_lokasi='"+this.app._lokasi+"'",
											  "select count(no_fa) from fa_asset where progress in ('2') and kode_lokasi='"+this.app._lokasi+"'",
											  ["no_fa","nama"],"and",["No FA","Deskripsi"],false);				
			}
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
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.cb_fa.getText()+")","");							
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