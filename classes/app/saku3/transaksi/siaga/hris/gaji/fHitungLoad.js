window.app_saku3_transaksi_siaga_hris_gaji_fHitungLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_gaji_fHitungLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_siaga_hris_gaji_fHitungLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan Gaji : Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Gaji",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:100});	
		this.e_pesan = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Pesan", maxLength:100});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal Transfer", underline:true}); 
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18],date:new Date().getDateStr()}); 
		this.cb_buat = new saiCBBL(this,{bound:[20,16,205,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:1});
		this.bUpload = new portalui_uploader(this,{bound:[820,16,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,320],caption:"Data Gaji"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,270],colCount:40,
				colTitle:["NAMA","NIK","STATUS","STS KAR","SALES","JAB","LOKER","HK","UHAR","GDAS","TPOS","TPRES","TSUS","TRANS","HT","TH","REM","RTPRES","INS","CUTI","BAS","THR","BONUS","RGDAS","RAPLL","PTRANS","PREM","PDPT","IK","PA","HP","POT","SALDO","KODE AKUN","JAMSOS","JIWAS","AKDHK","LMBR","CLAIN","PERIODE KERJA"],
		        colWidth:[[39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
			              [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,80,80,80,80,80,80,80,100]],	
				colFormat:[[38,37,36,35,34,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7],
				           [cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,295,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);				
		this.setTabChildIndex();
	}
};
window.app_saku3_transaksi_siaga_hris_gaji_fHitungLoad.extend(window.portalui_childForm);
window.app_saku3_transaksi_siaga_hris_gaji_fHitungLoad.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));				
				this.sgn.rearrange();
				this.sgn.activePage = 0;								
			}else throw(data);		
			var line;
			var tot = 0;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				if (line.sts_kar == "1" || line.sts_kar == "2" || line.sts_kar == "3") {
					line.jamsos = Math.round(6.24/100 * (parseFloat(line.rem) - parseFloat(line.tpres) - parseFloat(line.tsus)));
					if (line.jab == "03" || line.jab == "04" || line.jab == "05") 
						line.jiwas = Math.round(3/100 * (parseFloat(line.rem) - parseFloat(line.tsus)));
					else line.jiwas = Math.round(3/100 * parseFloat(line.rem));
					if (line.loker == "JKT") line.akdhk = Math.round(0.24/100 * (parseFloat(line.rem) - parseFloat(line.tpres) - parseFloat(line.tsus)));
					else line.akdhk = 0;				
				}
				if (line.sts_kar == "4" || line.sts_kar == "5" || line.sts_kar == "6") {
					if (line.sts_sales == "NON") {
						if (line.status.substr(0,1) == "K")
							line.jamsos = Math.round(12.24/100 * (parseFloat(line.rem) - parseFloat(line.tpres) - parseFloat(line.tsus)));
						else line.jamsos = Math.round(9.24/100 * (parseFloat(line.rem) - parseFloat(line.tpres) - parseFloat(line.tsus)));
						if (line.sts_kar == "5") line.akdhk = Math.round(0.24/100 * (parseFloat(line.rem) - parseFloat(line.tpres) - parseFloat(line.tsus)));
						else line.akdhk = 0;
					}else{
						if (line.status.substr(0,1) == "K")
							line.jamsos = Math.round(12.24/100 * parseFloat(line.rem) * 75/100);
						else line.jamsos = Math.round(9.24/100 * parseFloat(line.rem) * 75/100);
						if (line.sts_kar == "5") line.akdhk = Math.round(0.24/100 * parseFloat(line.rem) * 75/100);
						else line.akdhk = 0;
					}
				}				
				this.dataUpload.rows[i] = line;
			}
			this.sg1.clear();				
			this.selectPage(undefined, 1);
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([line.nama,line.nik,line.status,line.sts_kar,line.sts_sales,line.jab,line.loker,floatToNilai(line.hk),floatToNilai(line.uhar),floatToNilai(line.gdas),floatToNilai(line.tpos),floatToNilai(line.tpres),floatToNilai(line.tsus),floatToNilai(line.trans),floatToNilai(line.ht),floatToNilai(line.th),floatToNilai(line.rem),floatToNilai(line.rtpres),floatToNilai(line.ins),floatToNilai(line.cuti),floatToNilai(line.bas),floatToNilai(line.thr),floatToNilai(line.bonus),floatToNilai(line.rgdas),floatToNilai(line.rapll),floatToNilai(line.ptrans),floatToNilai(line.prem),floatToNilai(line.pdpt),floatToNilai(line.ik),floatToNilai(line.pa),floatToNilai(line.hp),floatToNilai(line.pot),floatToNilai(line.saldo),line.kode_akun,floatToNilai(line.jamsos),floatToNilai(line.jiwas),floatToNilai(line.akdhk),floatToNilai(line.lmbr),floatToNilai(line.clain),line.periode_kerja]);
		}
		this.sg1.setNoUrut(start);
	},
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :								
					var data = this.dbLib.getDataProvider("select nik from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						this.dataJU = data;
						dataNIK = new arrayMap();
						for (var i in this.dataJU.rs.rows){
							line = this.dataJU.rs.rows[i];
							dataNIK.set(line.nik, line);
						}
					}					
					for (var j=0; j < this.dataUpload.rows.length;j++){
						line1 = this.dataUpload.rows[j];																			
						if (dataNIK.get(line1.nik) == undefined) {							
							system.alert(this,"Transaksi tidak valid.","NIK tidak terdaftar. [kode "+line1.nik+" - Baris "+(j+2).toString()+"]");
							setTipeButton(tbSimpan);
							return false;						
						}						
					}					
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_gaji_m","no_gaji",this.app._lokasi+"-GJ"+this.e_periode.getText().substr(2,4)+".","000"));
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();
							//sql.add("delete from gr_gaji_m where periode='"+this.e_periode.getText()+"'");
							//sql.add("delete from gr_gaji_d where periode='"+this.e_periode.getText()+"'");
							//sql.add("delete from gr_gaji_load where periode='"+this.e_periode.getText()+"'");
							
							sql.add("insert into gr_gaji_m(no_gaji,kode_lokasi,periode,tanggal,keterangan,tgl_transfer,nik_buat,tgl_input,nik_user,pesan) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','"+this.e_pesan.getText()+"')");
							var line;												
							for (var i in this.dataUpload.rows){
								line = this.dataUpload.rows[i];
								sql.add("insert into gr_gaji_load(no_gaji,kode_lokasi,no_urut,nama,nik,status,sts_kar,sts_sales,jab,loker,hk,uhar,gdas,tpos,tpres,tsus,trans,ht,th,rem,rtpres,ins,cuti,bas,thr,bonus,rgdas,rapll,ptrans,prem,pdpt,ik,pa,hp,pot,saldo,kode_akun,jamsos,jiwas,akdhk,lmbr,clain,periode_kerja,periode) values "+
									" ('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.nama+"','"+line.nik+"','"+line.status+"','"+line.sts_kar+"','"+line.sts_sales+"','"+line.jab+"','"+line.loker+"',"+line.hk+","+line.uhar+","+line.gdas+","+line.tpos+","+line.tpres+","+line.tsus+","+line.trans+","+line.ht+","+line.th+","+line.rem+","+line.rtpres+","+line.ins+","+line.cuti+","+line.bas+","+line.thr+","+line.bonus+","+line.rgdas+","+line.rapll+","+line.ptrans+","+line.prem+","+line.pdpt+","+line.ik+","+line.pa+","+line.hp+","+line.pot+","+line.saldo+",'"+line.kode_akun+"',"+line.jamsos+","+line.jiwas+","+line.akdhk+","+line.lmbr+","+line.clain+",'"+line.periode_kerja+"','"+this.e_periode.getText()+"')");
							}							
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
									"select a.no_gaji,a.nik,'UHAR',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.uhar "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'GDAS',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.gdas "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'TPOS',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.tpos "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'TPRES',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.tpres "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'TSUS',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.tsus "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'TRANS',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.trans "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'HT',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.ht "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'TH',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.th "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+									
									"union "+
									"select a.no_gaji,a.nik,'RTPRES',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.rtpres "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'INS',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.ins "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'CUTI',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.cuti "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'BAS',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.bas "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'THR',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.thr "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'BONUS',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.bonus "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'RGDAS',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.rgdas "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'RAPLL',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.rapll "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'PTRANS',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.ptrans "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'PREM',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.prem "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'IK',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.ik "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'PA',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.pa "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'HP',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.hp "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'JAMSOS',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.jamsos "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'JIWAS',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.jiwas "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'AKDHK',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.akdhk "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'LMBR',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.lmbr "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select a.no_gaji,a.nik,'CLAIN',a.kode_lokasi,a.loker,a.kode_akun,'"+this.e_periode.getText()+"',a.clain "+
									"from gr_gaji_load a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ");
									
							//pajak
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
									"select '"+this.e_nb.getText()+"',x.nik,'TPPH',x.kode_lokasi,b.kode_loker,c.kode_akun,'"+this.e_periode.getText()+"', "+
									"case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end as pph21 "+
									"from "+
									"( "+
									"select a.nik,a.kode_lokasi,c.sts_pajak, "+
									"sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, "+
									"d.nilai as ptkp,d.biaya_jab,d.jab_max, "+
									"case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
									"	  else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, "+
									"(sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
									"case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
									"	 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
									"from gr_gaji_d a  "+
									"  inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
									"  inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
									"  inner join gr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi "+
									"where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode = '"+this.e_periode.getText()+"' "+
									"group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
									") x "+
									"    inner join gr_karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi "+
									"    inner join gr_gaji_param c on c.kode_param='TPPH' and c.kode_lokasi=x.kode_lokasi "+
									"    left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+
									"where case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0 and x.kode_lokasi = '"+this.app._lokasi+"' ");
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
									"select a.no_gaji,a.nik,'PPPH',a.kode_lokasi,a.kode_loker,b.kode_akun,a.periode,a.nilai "+
									"from gr_gaji_d a "+
									"    inner join gr_gaji_param b on b.kode_param='PPPH' and b.kode_lokasi=a.kode_lokasi "+
									"where a.kode_param='TPPH' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"'");
							
							setTipeButton(tbAllFalse);								
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_gaji_m","no_gaji",this.app._lokasi+"-GJ"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
