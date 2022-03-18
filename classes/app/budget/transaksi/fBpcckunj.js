/**
 * @author mr
 */
window.app_budget_transaksi_fBpcckunj = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fBpcckunj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fBpcckunj";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kunjungan BP-CC : Input", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("saiCBBL;util_standar;saiTable;datePicker");
			this.eTahun = new saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,change:[this,"doChange"]});
			this.eLokasi = new saiCBBL(this,{bound:[20,28,200, 20],caption:"Lokasi",multiSelection:false,change:[this,"doChange"]});
			this.ed_nb = new saiLabelEdit(this,{bound:[20,23,230,20],caption:"No Bukti", readOnly:true});					
			this.bGen = new button(this,{bound:[256,23,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   		
			this.cbPP = new saiCBBL(this,{bound:[20,28,200, 20],caption:"PP",multiSelection:false});						
			this.bHitung = new button(this,{bound:[839,28,80,20],caption:"Hitung",click:[this,"doClick"]});		   		
			
			this.p0 = new panel(this,{bound:[20,29,900,270],caption:"Daftar Peserta"});
			this.sg0 = new saiGrid(this.p0,{bound:[0,20,900,215],colCount:14,
						colTitle : "Kode Band,Nama Band,Januari,Februari,Maret,April,Mei,Juni,Juli,Agustus,September,Oktober,November,Desember",
						colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,80,80,80,80,80,70,70]],
						colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
						buttonStyle:[[0],[bsEllips]],
						columnReadOnly:[true,[0,1],[]],ellipsClick:[this,"doEllipseClick0"],defaultRow:1
						});		
			this.sgn0 = new sgNavigator(this.p0,{bound:[0,245,900,25],buttonStyle:2, grid:this.sg0, pager:[this,"doPager"]});					
			
			this.p1 = new portalui_panel(this,{bound:[20,10,900,this.height - 50],caption:"Daftar Kunjungan"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,this.p1.height - 45], colCount:14,rowCount:1,
				colTitle:"Jenis TPK, Kode Param, Nama Param, Band, Nama Band, Sts Pegawai, Status, Bulan, %Penderita, %Kunjungan, Jml Kunjungan, Total Bbn Pengobatan, Total Pdpt Kunjungan, Total SC",
				colWidth:[[0,1,2,3,4,5,6,7,8,9,10,11,12,13],[70,70,200,60,60,80,80,80,80,80,80,120,120,100]],
				readOnly:true,
				colFormat:[[13,12,11,10,9,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
			});
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.sg1.height + 20, 898, 25], grid:this.sg1,buttonStyle:3});
			
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();					
			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}

			this.eLokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokkonsol = '"+this.app._lokKonsol+"' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.eLokasi.setText(this.app._lokasi);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fBpcckunj.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_transaksi_fBpcckunj.implement({
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
		if (modalResult != mrOk) return;
		try{
			switch (event)
			{
				case "clear" :
							this.standarLib.clearByTag(this,["0"],undefined);											
							this.sg0.clear(1);
							this.sg1.clear(1);
					break;
				case "simpan" :
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();												
							this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_bpcc_m","no_bpcc",this.eLokasi.getText()+"-BPCC"+this.eTahun.getText().substr(2,2),"000"));
							
							sql.add("insert into agg_bpcc_m(no_bpcc,keterangan,kode_lokasi,kode_pp,nik_app,periode) values "+
									"('"+this.ed_nb.getText()+"','-','"+this.eLokasi.getText()+"','"+this.cbPP.getText()+"','-','"+this.eTahun.getText()+"')");					
							
							for (var i=0; i < this.sg0.rows.getLength(); i++) {
								for (var j=2; j < 14; j++) {
									var bln = j-1;
									sql.add("insert into agg_bpcc_peserta (no_bpcc,kode_band,kode_lokasi,periode,jumlah) values "+
									   	    "('"+this.ed_nb.getText()+"','"+this.sg0.cells(0,i)+"','"+this.eLokasi.getText()+"','"+this.eTahun.getText()+(bln < 10 ? "0" + bln :bln)+"',"+parseNilai(this.sg0.cells(j,i))+")");
									var strSQL = "select '"+this.ed_nb.getText()+"','"+this.eLokasi.getText()+"','"+this.cbPP.getText()+"',d.kode_param,e.kode_band,a.status_pst,a.jenis_pst,a.jenis_tpk,"+
										"round("+parseNilai(this.sg0.cells(j,i))+" * a.p_derita/100 * a.p_kunjungan /100,0) as jml,"+
										"round("+parseNilai(this.sg0.cells(j,i))+" * a.p_derita/100 * a.p_kunjungan /100,0) * round(b.persen/100 * c.tbiaya,0) as biaya,"+
										"round("+parseNilai(this.sg0.cells(j,i))+" * a.p_derita/100 * a.p_kunjungan /100,0) * c.tkunjungan as kunj,"+
										"round("+parseNilai(this.sg0.cells(j,i))+" * a.p_derita/100 * a.p_kunjungan /100,0) * c.tsc as sc,'"+this.eTahun.getText()+"'+a.bulan as periode,"+
										"a.p_derita,a.p_kunjungan,round("+parseNilai(this.sg0.cells(j,i))+" * a.p_derita/100,0) as jml_derita "+
										"from agg_bpcc_rumus a  "+
										"inner join agg_band e on a.kode_band=e.kode_band and a.tahun='"+this.eTahun.getText()+"' "+
										"inner join agg_bpcc_param d on a.kode_param=d.kode_param and a.tahun=d.tahun "+
										"inner join agg_bpcc_index b on a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
										"inner join agg_bpcc_tarif c on  "+
										"   a.kode_param=c.kode_param and "+
										"   a.kode_band=c.kode_band and "+
										"   a.status_pst=c.status_pst and "+
										"   a.jenis_pst=c.jenis_pst and "+
										"   a.tahun=c.tahun and "+
										"   a.kode_lokasi = c.kode_lokasi "+
										"where a.kode_band = '"+this.sg0.cells(0,i)+"' and a.tahun = '"+this.eTahun.getText()+"' and a.bulan = '"+(bln < 10 ? "0" + bln :bln)+"' "+
										"	  and a.kode_lokasi ='"+this.eLokasi.getText()+"' ";
									sql.add("insert into agg_bpcc_d (no_bpcc,kode_lokasi,kode_pp,kode_param,kode_band,status_pst,jenis_pst,jenis_tpk,jumlah,nilai_biaya,nilai_kunjungan,nilai_sc,periode,p_derita,p_kunjungan,jml_derita) "+strSQL);											
								}							
							}
														
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}	
								break;
				case "ubah" :					
								break;
				case "hapus" :
				    			break;
			}
			
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doChange : function(sender) {
		if (sender == this.eLokasi && this.eLokasi.getText() !="") {
			this.cbPP.setSQL("select kode_pp, nama from agg_pp where kode_lokasi = '"+this.eLokasi.getText()+"' and tipe = 'posting'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
		}
	},
	doClick: function(sender){	
		if (sender == this.bGen)
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_bpcc_m","no_bpcc",this.eLokasi.getText()+"-BPCC"+this.eTahun.getText().substr(2,2),"000"));
		if (sender == this.bHitung) {
			try{
				this.sg1.clear();
				this.dataKunj = new arrayList();
				for (var i=0; i < this.sg0.rows.getLength(); i++) {
					if (this.sg0.rowValid(i)){
						for (var j=2; j < 14; j++) {
							var bln = j-1;
							var strSQL = "select a.jenis_tpk,d.kode_param,d.nama as nama_param,e.kode_band,e.nama as nama_band,a.status_pst,a.jenis_pst,a.bulan,a.p_derita,a.p_kunjungan,  "+
										"round("+parseNilai(this.sg0.cells(j,i))+" * a.p_derita/100 * a.p_kunjungan /100,0) as jml, "+
										"round("+parseNilai(this.sg0.cells(j,i))+" * a.p_derita/100 * a.p_kunjungan /100,0) * round(b.persen/100 * c.tbiaya,0) as biaya, "+
										"round("+parseNilai(this.sg0.cells(j,i))+" * a.p_derita/100 * a.p_kunjungan /100,0) * c.tkunjungan as kunj, "+
										"round("+parseNilai(this.sg0.cells(j,i))+" * a.p_derita/100 * a.p_kunjungan /100,0) * c.tsc as sc "+
										"from agg_bpcc_rumus a  "+
										"inner join agg_band e on a.kode_band=e.kode_band and a.tahun='"+this.eTahun.getText()+"' "+
										"inner join agg_bpcc_param d on a.kode_param=d.kode_param and a.tahun=d.tahun "+
										"inner join agg_bpcc_index b on a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
										"inner join agg_bpcc_tarif c on  "+
										"   a.kode_param=c.kode_param and "+
										"   a.kode_band=c.kode_band and "+
										"   a.status_pst=c.status_pst and "+
										"   a.jenis_pst=c.jenis_pst and "+
										"   a.tahun=c.tahun and "+
										"   a.kode_lokasi = c.kode_lokasi "+
										"where a.kode_band = '"+this.sg0.cells(0,i)+"' and a.tahun = '"+this.eTahun.getText()+"' and a.bulan = '"+(bln < 10 ? "0" + bln :bln)+"' "+
										"	  and a.kode_lokasi ='"+this.eLokasi.getText()+"' ";
							var temp = this.dbLib.getDataProvider(strSQL,true);
							if (typeof temp != "string") {
								for (var r in temp.rs.rows){
									this.dataKunj.add(temp.rs.rows[r]);
								} 
							}else systemAPI.alert(temp);
						}
					}
				}
				this.rowPerPage = 20;
				this.sgn.setTotalPage(Math.ceil(this.dataKunj.getLength() / this.rowPerPage));
				this.sgn.rearrange();		
				this.sgn.activePage = 0;	
				this.doSelectPage(1);
			}catch(e){
				alert(e);
			}
		}
	},
	doSelectPage: function(page) {
		var start = (page - 1) * this.rowPerPage;
		var finish = (start + this.rowPerPage > this.dataKunj.getLength() ? this.dataKunj.getLength() : start + this.rowPerPage);
		this.sg1.clear();
		var line, data;

		for (var i=start; i  < finish; i++){
			line = this.dataKunj.get(i);
			data = [];
			for (var c in line) data[data.length] = line[c];
			this.sg1.appendData([line.jenis_tpk,line.kode_param,line.nama_param,line.kode_band,line.nama_band,line.status_pst,line.jenis_pst,line.bulan,line.p_derita,line.p_kunjungan,floatToNilai(line.jml),floatToNilai(line.biaya),floatToNilai(line.kunj),floatToNilai(line.sc)]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page){
		this.doSelectPage(page);	
	},
	doEllipseClick0: function(sender, col, row){
		try{						
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Band",sender,undefined, 
											  "select kode_band,nama from agg_band",
											  "select count(kode_band)  from agg_band",
											  ["kode_band","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1) {
						system.info(this,"Transaksi Sukses ("+ this.ed_nb.getText()+")","");
						this.doModalResult("clear",mrOk);	
					}
					else system.alert(this, result,""); 
					break;
			}
		}
	}
});
