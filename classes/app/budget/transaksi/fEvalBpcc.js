/**
 * @author mr
 */
window.app_budget_transaksi_fEvalBpcc = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fEvalBpcc.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fEvalBpcc";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Approval BPCC dan Kunjungan : Input", 0);
		try{	
			uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;portalui_saiCBB");			
			this.lblTgl1 = new portalui_label(this, {bound: [20, 32, 101, 20],caption: "Tanggal",underline: true});						
			this.dp_tgl1 = new portalui_datePicker(this, {bound: [120, 32, 90, 18]});				
			this.bGen = new portalui_button(this, {bound: [256, 78, 80, 20],caption: "Gen",icon: "url(icon/" + system.getThemes() + "/process.png)"});				
			this.ed_nb = new portalui_saiLabelEdit(this, {bound: [20, 78, 230, 20],caption: "No Bukti",readOnly:true});			
			this.ed_desc = new portalui_saiLabelEdit(this, {bound: [20, 10, 500, 20],caption: "Deskripsi",maxLength: 150,tag:1});								
			this.eTotal2 = new portalui_saiLabelEdit(this,{bound:[720,10,200,20],caption:"Total Kunjungan",readOnly:true,tipeText:ttNilai,text:"0"});
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],tipeText:ttAngka,caption:"Tahun Anggaran",maxLength:4,tag:2});
			this.i_viewer = new portalui_imageButton(this,{bound:[200,12,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoadData"]});
			this.eTotal = new portalui_saiLabelEdit(this,{bound:[720,12,200,20],caption:"Total Biaya",readOnly:true,tipeText:ttNilai,text:"0"});
			
			this.p0 = new portalui_panel(this,{bound: [20, 231, 900, 355],caption: "Daftar Transaksi Angg. BPCC dan Kunjungan"});	    				
			this.sg0 = new portalui_saiGrid(this.p0, {bound: [1, 20, 895, 308],colCount: 9,
					colTitle:["Status","No Bukti","NIK App","Deskripsi","Bisnis Unit","Jenis","Tahun","Total Biaya","Total Kunj"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,60,80,100,220,80,120,70]],
					colFormat:[[7,8],[cfNilai,cfNilai]],buttonStyle:[[0],[bsAuto]],readOnly:true,
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					change:[this,"doChangeCell"],defaultRow:1});    			
			this.sgNav0 = new portalui_sgNavigator(this.p0, {bound: [1, 330, 897, 25],grid: this.sg0,border: 0,buttonStyle: 3});		
			
			
			this.p1 = new portalui_panel(this,{bound: [20, 232, 900, 355],caption: "Daftar Item Anggaran",visible:false});	    				
			this.sg1 = new portalui_saiGrid(this.p1, {bound: [1, 20, 895, 308],colCount: 15, tag:9,
					colTitle:["Kode RKA","Nama RKA","No DRK","Nama DRK","Kode Var","Ket. Variabel","Kode Akun","Nama Akun","Kode BU","Bisnis Unit","Periode","Jumlah","Volume","Tarif","Total"],
					colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,80,80,80,100,150,80,150,80,150,80,150,80,150,80]],
					colFormat:[[12,11,14,13],[cfNilai, cfNilai, cfNilai, cfNilai]],readOnly:true,defaultRow:1});    								
			this.sgNav = new portalui_sgNavigator(this.p1, {bound: [1, 330, 897, 25],grid: this.sg1,border: 0,buttonStyle: 3});		
			
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.setTabChildIndex(); 

			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();											
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.sg0.onNilaiChange.set(this, "doNilaiChange");
			this.sg0.onDblClick.set(this,"doDblClick");
			this.sgNav0.onPager.set(this, "doPager");
			this.sgNav.onPager.set(this, "doPager");
			this.ed_period= this.dp_tgl1.getYear().toString()+(this.dp_tgl1.getMonth() < 10 ? "0" : "") +this.dp_tgl1.getMonth();
			this.standarLib.clearByTag(this,["0","1"],this.dp_tgl1);				
			this.baris = this.app._baris;
			this.sg0.clear(1);
			this.sg1.clear(1);
			this.eTahun.setText("2010");
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fEvalBpcc.extend(window.portalui_childForm);
window.app_budget_transaksi_fEvalBpcc.implement({
	mainButtonClick : function(sender){
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
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0","8","9"),this.dp_tgl1);				
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg0.clear(1); 
					//this.sg1.clear(1); 
				}
				break;
			case "simpan" :				
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_bpccapp_m','no_app',this.app._lokasi+"-BPCC"+this.dp_tgl1.getThnBln().substr(2,2)+""+(this.dp_tgl1.getMonth()< 10 ?"0":"")+this.dp_tgl1.getMonth()+".",'0000'));
				var sql = new server_util_arrayList();
				sql.add("insert into agg_bpccapp_m(no_app, kode_lokasi, tanggal, keterangan, tgl_input, nik_user, tahun)"+
						"                   values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDateString()+"','"+this.ed_desc.getText()+"',now(), '"+this.app._userLog+"','"+this.eTahun.getText()+"')");
				
				var line;
				for (var i in this.dataABAU.rs.rows){
					line = this.dataABAU.rs.rows[i];					
					if (line.status.toUpperCase() == "APP"){
						/*
						sql.add("update agg_abau_m set progress='1' where no_abau='"+line.no_abau+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into agg_abauapp_d(no_app, kode_lokasi, no_abau)"+
								"                values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+line.no_abau+"')");						
						*/
						//baru biaya, kunjungan dan cost sharing belum
						sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul) "+
								"select a.kode_lokasi,x.kode_pk,x.kode_drk,b.kode_rka,d.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),a.jumlah,1,c.tbiaya,substring(a.periode,1,4),a.no_bpcc,'BPCC' "+
								"from agg_bpcc_d a  "+
								"	inner join agg_bpcc_tarif c on a.jenis_pst=c.jenis_pst and a.kode_param=c.kode_param and substring(a.periode,1,4)=c.tahun  "+
								"	inner join agg_bpcc_param d on a.kode_param=d.kode_param and substring(a.periode,1,4)=d.tahun  "+
								"	inner join agg_rka b on d.kode_rka=b.kode_rka and b.kode_lokasi='"+this.app._lokasi+"' and d.tahun=b.tahun "+
								"	inner join agg_drk x on b.kode_drk=x.kode_drk and x.kode_lokasi=b.kode_lokasi and x.tahun=b.tahun "+
								"where a.no_bpcc='"+line.no_bpcc+"' and a.kode_lokasi='"+this.app._lokasi+"' ");
					}
				}				
				this.dbLib.execArraySQL(sql);
				break;
			case "simpancek" : this.simpan();
				break;
		}
	},
	genClick: function(sender){
		try{
			if (this.ed_period != ""){
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_bpccapp_m','no_app',this.app._lokasi+"-BPCC"+this.dp_tgl1.getThnBln().substr(2,2)+""+(this.dp_tgl1.getMonth()< 10 ?"0":"")+this.dp_tgl1.getMonth()+".",'0000'));
				this.ed_desc.setFocus();
			}
		}
		catch (e)
		{
			alert(e);
		}
	},
	doLoadData: function(sender){	
		if (this.eTahun.getText() != "") {
			var data = this.dbLib.getDataProvider("select 'INPROG' as status,a.no_bpcc,a.nik_app,a.keterangan,(a.kode_pp+' - '+b.nama) as bu, '-' as jenis, a.periode as tahun, c.total, c.total_kunj  "+
										"from agg_bpcc_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
										"                  inner join ( "+
										"							   select a.no_bpcc,a.kode_lokasi,sum(a.jumlah*b.tbiaya) as total,sum(a.jumlah*b.tkunjungan) as total_kunj "+
										"                              from agg_bpcc_d a inner join agg_bpcc_tarif b on a.jenis_pst=b.jenis_pst and a.kode_param=b.kode_param and substring(a.periode,1,4)=b.tahun "+
										"                              where a.kode_lokasi='"+this.app._lokasi+"' "+
										"                              group by a.no_bpcc,a.kode_lokasi) c on a.no_bpcc=c.no_bpcc and a.kode_lokasi=c.kode_lokasi "+
										"where a.periode ='"+this.eTahun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);			
			this.dataABAU = undefined;
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				this.rowPerPage = 20;
				this.sgNav0.setTotalPage(Math.ceil(data.rs.rows.length / this.rowPerPage));
				this.sgNav0.rearrange();		
				this.sgNav0.activePage = 0;						
				this.dataABAU = data;
				this.doPagerSG0(1);
			} else systemAPI.alert(data);
		}
	},
	doPagerSG0: function(page){
		this.pageSG0 = page;
		var start = (page - 1) * this.rowPerPage;
		var finish = start + this.rowPerPage;
		finish = finish > this.dataABAU.rs.rows.length ? this.dataABAU.rs.rows.length : finish;
		this.sg0.clear();
		var data = this.dataABAU;
		for (var i= start; i < finish;i++){
			line = data.rs.rows[i];					
			this.sg0.appendData([line.status.toUpperCase(),line.no_bpcc,line.nik_app,line.keterangan,line.bu,line.jenis.toUpperCase(),line.tahun,floatToNilai(line.total),floatToNilai(line.total_kunj)]);
		}
		this.sg0.setNoUrut(start);
	},
	doSelect: function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period= year.toString()+month;
	},
	doNilaiChange: function(){		
		var tot = tot2 = 0;
		var line;
		for (var i in this.dataABAU.rs.rows){
			line = this.dataABAU.rs.rows[i];
			if (line.status.toUpperCase() == "APP") {
				tot += parseFloat(line.total);
				tot2 += parseFloat(line.total_kunj);
			}
		}
		this.eTotal.setText(floatToNilai(tot));
		this.eTotal2.setText(floatToNilai(tot2));
	},
	doChangeCell: function(sender, col, row) {		
		if (this.dataABAU){			
			this.dataABAU.rs.rows[(this.pageSG0 - 1) * this.rowPerPage + row].status = sender.cells(0, row);						
		}
		this.sg0.validasi();
	},
	doPager: function(sender, page){
		if (sender == this.sgNav0) this.doPagerSG0(page);
		if (sender == this.sgNav) this.doLoadDetail(page);
	},
	doLoadDetail: function(page){
		this.pageSG1 = page;
		var start = (page - 1) * this.rowPerPage;
		var finish = start + this.rowPerPage;
		finish = finish > this.dataDetail.rs.rows.length ? this.dataDetail.rs.rows.length : finish;
		this.sg1.clear();
		var data = this.dataDetail;
		for (var i in data.rs.rows){
			line = data.rs.rows[i];							
			this.sg1.appendData([line.kode_rka,line.nama_rka,line.kode_drk,line.nama_drk,line.kode_var,line.nama_var,line.kode_akun,line.nama_akun,line.kode_pp2,line.nama_pp2,line.bulan,floatToNilai(line.jumlah),floatToNilai(line.volume),floatToNilai(line.tarif),floatToNilai(line.nilai)]);
		}
		this.sg1.setNoUrut(start);
	},
	/*
	doDblClick: function(sender, col , row){
		var data = this.dbLib.getDataProvider("select a.tanggal,a.keterangan,a.kode_pp,c.nama as nama_pp,case a.jenis when 'R' then 'RECURING' else 'TAMBAHAN' end as jenis,a.tahun,"+
				   "     b.kode_rka,d.nama as nama_rka,b.kode_drk,e.nama as nama_drk,b.kode_var,f.nama as nama_var,b.kode_akun,g.nama as nama_akun,b.kode_pp as kode_pp2,h.nama as nama_pp2,b.bulan,b.jumlah,b.volume,b.tarif,b.nilai "+
				   "from agg_abau_m a "+
				   "     inner join agg_abau_d b on a.no_abau=b.no_abau and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
				   "     inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
				   "     inner join agg_rka d on b.kode_rka=d.kode_rka and a.kode_lokasi=d.kode_lokasi and a.tahun=d.tahun "+
				   "     inner join agg_drk e on b.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and a.tahun=e.tahun "+
				   "     inner join agg_var f on b.kode_var=f.kode_var and a.kode_lokasi=f.kode_lokasi "+
				   "     inner join agg_masakun g on b.kode_akun=g.kode_akun and a.kode_lokasi=g.kode_lokasi "+
				   "     inner join agg_pp h on b.kode_pp=h.kode_pp and a.kode_lokasi=h.kode_lokasi "+
				   " where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_abau = '"+this.sg0.cells(1,row)+"' order by b.no_urut",true);		
		if (typeof data != "string"){
			var line;			
			this.sgNav.setTotalPage(Math.ceil(data.rs.rows.length / 20));
			this.sgNav.rearrange();
			this.dataDetail = data;
			this.doLoadDetail(1);			
		}
	},
	*/
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
					if (result.toLowerCase().search("error") == -1)					
					{						
						this.app._mainForm.pesan(2,"Transaksi sukses tersimpan dengan no bukti :("+ this.ed_nb.getText()+")");						
						this.app._mainForm.bClear.click();              						
					}else system.info(this,result,"");
	    			break;	      			
					case "listData" :
						this.sg1.clear(1); 
					break;
	    		}
			}
			catch(e)
			{
				alert(e);
			}
	    }
	}
});
