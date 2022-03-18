window.app_saku2_transaksi_kopeg_fa_fFasusutAkun = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_fa_fFasusutAkun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_fa_fFasusutAkun";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyusutan Aktiva Tetap", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_pp = new saiCBBL(this,{bound:[20,18,200,20],caption:"PP Penyusutan", multiSelection:false, maxLength:10, tag:2 });
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_nilai = new saiLabelEdit(this,{bound:[550,17,200,20],caption:"Total Penyusutan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this,{bound:[780,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
			
		this.pc1 = new pageControl(this,{bound:[20,12,840,333], childPage:["Data Jurnal Penyusutan","Data Anggaran"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:7,tag:9,
		            colTitle:["Akun BP","Nama Akun","Akun Deprs","Nama Akun","Kode DRK","Nama DRK","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,150,80,150,80,150,80]],
					colFormat:[[6],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});	
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[820,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
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
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='FAAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_fa_fFasusutAkun.extend(window.childForm);
window.app_saku2_transaksi_kopeg_fa_fFasusutAkun.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fasusut_m","no_fasusut",this.app._lokasi+"-RSU"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into fasusut_m(no_fasusut,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','F','FA','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate())");					
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						sql.add("insert into fasusut_j(no_fasusut,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+line.akun_bp+"','"+this.e_ket.getText()+"','D',"+line.nilai_susut+",'"+this.cb_pp.getText()+"','"+line.kode_drk+"','"+this.app._lokasi+"','FA','BP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
						sql.add("insert into fasusut_j(no_fasusut,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+line.akun_deprs+"','"+this.e_ket.getText()+"','C',"+line.nilai_susut+",'"+this.cb_pp.getText()+"','"+line.kode_drk+"','"+this.app._lokasi+"','FA','AP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_fasusut,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,0,nilai "+
							"from fasusut_j where dc= 'D' and no_fasusut = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					var perNext = nextNPeriode(this.e_periode.getText(),1);
					sql.add("call sp_fa_susut_akun ('"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+perNext+"','"+this.e_nb.getText()+"')");
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
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.doHitungGar();
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (nilaiToFloat(this.sg2.cells(7,i))>0 && nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
							return false;						
						}
					}
				}				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai penyusutan tidak boleh nol atau kurang.");
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
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fasusut_m","no_fasusut",this.app._lokasi+"-RSU"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
	},
	doLoadData: function(sender){
		if (this.cb_pp.getText() != "") {
			var tahun=this.e_periode.getText().substr(0,4);
			this.e_nilai.setText("0");		
			var strSQL = "select b.akun_bp,x.nama as nama_bp,b.akun_deprs,y.nama as nama_deprs,b.kode_drk,c.nama as nama_drk, "+
						 "sum(case when (a.nilai-a.nilai_residu-isnull(d.tot_susut,0)) > ceiling(a.nilai/a.umur) "+
						 "		 then ceiling(a.nilai/a.umur)  "+
						 "		 else ceiling(a.nilai-a.nilai_residu-isnull(d.tot_susut,0)) end) as nilai_susut "+
						 "from fa_asset a  "+
						 "inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
						 "inner join drk c on b.kode_drk=c.kode_drk and b.kode_lokasi=c.kode_lokasi and c.tahun='"+tahun+"' "+
						 "inner join masakun x on b.akun_bp=x.kode_akun and b.kode_lokasi=x.kode_lokasi "+
						 "inner join masakun y on b.akun_deprs=y.kode_akun and b.kode_lokasi=y.kode_lokasi "+
						 "left join "+
						 "   (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
						 "	  from fasusut_d where kode_lokasi = '"+this.app._lokasi+"' group by no_fa,kode_lokasi) d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi "+					 
						 "where a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"' and (a.nilai-a.nilai_residu) > isnull(d.tot_susut,0) and a.periode_susut = '"+this.e_periode.getText()+"' "+
						 "group by b.akun_bp,b.akun_deprs,b.kode_drk,c.nama,x.nama,y.nama "+
						 "order by b.akun_bp";		
		
			/* percepatan
			var strSQL = "select b.akun_bp,x.nama as nama_bp,b.akun_deprs,y.nama as nama_deprs,a.kode_pp_susut,c.nama as nama_pp, "+					 
						 "		 sum(ceiling(a.nilai-a.nilai_residu-isnull(d.tot_susut,0))) as nilai_susut "+
						 "from fa_asset a  "+
						 "inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
						 "inner join pp c on a.kode_pp_susut=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "inner join masakun x on b.akun_bp=x.kode_akun and b.kode_lokasi=x.kode_lokasi "+
						 "inner join masakun y on b.akun_deprs=y.kode_akun and b.kode_lokasi=y.kode_lokasi "+
						 "left join "+
						 "   (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
						 "	  from fasusut_d where kode_lokasi = '"+this.app._lokasi+"' group by no_fa,kode_lokasi) d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi "+
						 "where a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"' and (a.nilai-a.nilai_residu) > isnull(d.tot_susut,0) and a.periode_susut = '"+this.e_periode.getText()+"' "+
						 "group by b.akun_bp,b.akun_deprs,a.kode_pp_susut,c.nama,x.nama,y.nama "+
						 "order by b.akun_bp";
			*/			 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				var line;
				var tot = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot = tot + parseFloat(line.nilai_susut);												
				}		
				this.doHitungGar();
				this.e_nilai.setText(floatToNilai(tot));
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);	
		}
		else {
			system.alert(this,"DRK harus valid.","Isi DRK untuk anggaran");					
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			this.cb_pp.setSQL("select kode_pp, nama from pp where tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);
			this.dataJU.rs.rows = [];
			this.sg.clear(1); 
		}
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.akun_bp,line.nama_bp,line.akun_deprs,line.nama_deprs,line.kode_drk,line.nama_drk,floatToNilai(line.nilai_susut)]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		var line;
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];
			nilai = line.nilai_susut;				
			var isAda = false;
			var idx = total = 0;
			for (var j=0;j < this.sg2.getRowCount();j++){
				if (line.akun_bp == this.sg2.cells(0,j) && line.kode_drk == this.sg2.cells(4,j)) {
					isAda = true;
					idx = j;
					break;
				}
			}
			if (!isAda) {
				this.sg2.appendData([line.akun_bp,line.nama_bp,this.cb_pp.getText(),this.cb_pp.rightLabelCaption,line.kode_drk,line.nama_drk,"0",floatToNilai(nilai),"0"]);
			} 
			else { 
				total = nilaiToFloat(this.sg2.cells(7,idx));
				total = total + nilai;
				this.sg2.setCell(7,idx,total);
			}
		}
		
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(6,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(7,i));
				this.sg2.cells(8,i,floatToNilai(sls));
			}
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